#!/usr/bin/env python3
#this script dumps all the data in a json array, the file, "newscap.json" will have to be imported: example
# mongoimport --uri <MONGOURI> --collection "courses" --type json --file "newscrap.json" --jsonArray

from bs4 import BeautifulSoup
import requests
import json


baseurl = 'https://eservices.minnstate.edu'
campusid = 304
eservicescollegepage = baseurl + '/registration/search/basic.html?campusid=' + str(campusid)

def makesearchpageurl(campusid, yrtr, subject):
    return  "https://eservices.minnstate.edu/registration/search/advancedSubmit.html?campusid=" + str(campusid) +  "&searchrcid=0304&searchcampusid=304&yrtr=" + yrtr + "&subject=" + subject +"&courseNumber=&courseId=&openValue=OPEN_PLUS_WAITLIST&delivery=ALL&showAdvanced=&starttime=&endtime=&mntransfer=&credittype=ALL&credits=&instructor=&keyword=&begindate=&site=&resultNumber=250"


def daytoabbrev(string):
    #there is no case/switch in python
    days = {
            'Monday'    : 'monday',
            'Tuesday'   : 'tuesday',
            'Wednesday' : 'wednesday',
            'Thursday'  : 'thursday',
            'Friday'    : 'friday',
            'Saturday'  : 'saturday',
            'Sunday'    : 'sunday',
            ''          : ''
            }

    return days[string]


def meetingdetails(classrow):
    #Dates	Days	Time	Building/Room	Instructor


    days = ""
    daysabbr    = classrow[1].find_all('abbr')
    for abbr in daysabbr:
        longday = abbr.get('title').strip(' ')
        if longday == 'not available':
            longday = ''
        days += daytoabbrev(longday) + ","

    days = days.strip(' ')


    #\xa0 is non breaking space
    #https://stackoverflow.com/questions/10993612/python-removing-xa0-from-string
    dates       = classrow[0].contents[0].replace('\n','').replace('\t','').replace(' ','').replace(u'\xa0', u' ')
    time        = classrow[2].contents[0].replace('\n','').replace('\t','').replace(' ','').replace(u'\xa0', u' ')
    room        = classrow[3].contents[0].replace('\n','').replace('\t','').strip(' ')
    instructor  = classrow[4].contents[0].replace('\n','').replace('\t','').strip(' ').replace(u'\xa0', '')
    return {
            'dates'             : dates,
            'time'              : time,
            'days'              : days,
            'buildingAndRoom'   : room,
            'instructor'        : instructor
    }

def locationdetails(locrow):
    data  = locrow[0].find_all('td')
    data2 = locrow[1].find_all('td')
    offeredthrough = data[0].find('b').next_sibling.strip(' ').replace('\n','').replace('\t','').replace(':','').replace('.','').strip(' ')
    campus        = data2[0].find('b').next_sibling.strip(' ').replace('\n','').replace('\t','').replace(':','').replace('.','').strip(' ')
    location      = data2[1].find('b').next_sibling.strip(' ').replace('\n','').replace('\t','').replace(':','').replace('.','').strip(' ')
    return {
            'campus'        : campus,
            'offeredThrough': offeredthrough,
            'location'      : location
    }

def plandetails(myplantable):
    myplandata = myplantable.find('tr').find_all('td')
    idnum    =       myplandata[1].contents[0].replace('\n','').replace('\t','').replace(' ','')
    subject  =       myplandata[2].contents[0].replace('\n','').replace('\t','').replace(' ','')
    number   =       myplandata[3].contents[0].replace('\n','').replace('\t','').replace(' ','')
    section  =       myplandata[4].contents[0].replace('\n','').replace('\t','').replace(' ','')
    title    =       myplandata[5].contents[0].replace('\n','').replace('\t','').strip(' ')
    credits  =       myplandata[9].contents[0].replace('\n','').replace('\t','').replace(' ','')
    delivery = ""     

    insidetags = myplandata[12].find('abbr')
    if insidetags is None:
        pass
    else:
        delivery = insidetags.contents[0]

    return {
            'courseNum' : idnum,
            'section'   : section,
            'title'     : title,
            'credits'   : credits,
            'subject'   : subject,
            'number'    : number,
            'delivery'  : delivery
    }

def feedetails(feerows):
    resident    = feerows[0].find('td').contents[0].replace('\n','').replace('\t','').replace(' ','').replace('$','')
    nonresident = feerows[1].find('td').contents[0].replace('\n','').replace('\t','').replace(' ','').replace('$','')
    totalfees   = feerows[2].find('td').contents[0].replace('\n','').replace('\t','').replace(' ','').replace('$','')
    return {
            'resident'    : resident,
            'nonResident' : nonresident,
            'fees'        : totalfees,
    }



semesterspage = requests.get(eservicescollegepage)


parsedpage = BeautifulSoup(semesterspage.text, 'html.parser')

semesters = parsedpage.find('select', id='yrtr').find_all('option')

subjects  = parsedpage.find('select', id='subject')


#sem2 = []
#sem2.append(semesters[2])
#semesters = sem2

for sem in semesters:
    print(str(sem.contents) + ", " + str(sem['value']))


print()

allsubjects = subjects.find_all('option')
for sub in allsubjects:
    print(sub['value'])


jsonlist = []

for sem in semesters:
    subjectsofsemester = subjects.find_all('option', class_=sem['value'])
    cleansemester = sem.contents[0].split('(')[0].replace('\n',' ').strip(' ')
    print("==========================================")
    print('subjects of ' + cleansemester + str(sem['value']))
    print("==========================================")

    for sub in subjectsofsemester:
        print(str(sub.contents) + ", " + str(sub['value']))
        courseurl = makesearchpageurl(campusid, sem['value'], str(sub['value']))
        print("        " + courseurl)
        coursepage  = BeautifulSoup(requests.get(courseurl).text, 'html.parser')
        coursetable = coursepage.find('table', id='resultsTable').find_all('div', class_='meta')

        for course in coursetable:
            courserow = course.find('a', href=True)
            classurl = baseurl + courserow.get('href')
            print("                course: " + str(classurl) + "    " + str(courserow.get('title')))
            classpage = BeautifulSoup(requests.get(classurl).text, 'html.parser')

            myplantable = classpage.find('table', class_='myplantable').find('tbody')
            planstruct = plandetails(myplantable)
            print("                        " + str(planstruct))
                
            
            
            
            meetingtables = classpage.find_all('table', class_='meetingTable')


            classtable = meetingtables[0].find_all('tr')
            #skip <th> from table
            didskip = False
            meetinglist = []
            for classrow in classtable:
                if didskip:
                    meetinglist.append(meetingdetails(classrow.find_all('td')))
                else:
                    didskip = True
            print("                        " + str(meetinglist))

            locationtable = meetingtables[1].find_all('tr')
            locationstruct = locationdetails(locationtable)
            print("                        " + str(locationstruct))



            feetable = classpage.find('table', class_='fees').find('tbody').find_all('tr')
            if len(feetable) == 0:
                print("                        " + "fees not currently known")
                feestruct = {}
            else:
                feestruct = feedetails(feetable)
                print("                        " + str(feestruct))


            alldetails = classpage.find_all('div', class_='detaildiv')
            coursedescription = alldetails[-1].next_sibling.replace('\t', '').replace('\n','').strip(' ')

           
            splitsemester = cleansemester.split(' ')
            season        = splitsemester[0]
            year          = int(splitsemester[1])

            jsondata = {}
            jsondata['realTimes'] = meetinglist
            jsondata['locationDetails'] = locationstruct
            jsondata['costs']       = feestruct
            jsondata['courseID']    = planstruct['courseNum']
            jsondata['subject']     = planstruct['subject']
            jsondata['section']     = planstruct['section']
            jsondata['credits']     = planstruct['credits']
            jsondata['number']      = planstruct['number']
            jsondata['title']       = planstruct['title']
            jsondata['description'] = coursedescription
            jsondata['season']      = season
            jsondata['year']        = year
            jsondata['url']         = classurl
            jsonlist.append(jsondata)
            print(json.dumps(jsondata, indent=8))




with open('course_for_sql.json', "w") as write_file:
    json.dump(jsonlist, write_file)




