from bs4 import BeautifulSoup
import requests
import csv
import json




def makeUrl(number):
    return "http://catalog.century.edu/content.php?catoid=7&catoid=7&navoid=364&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=" + str(number) + "#acalog_template_course_filter"




pagenumbers = [1,2,3,4,5,6,7,8,9,10,11]

course_list = []


for number in pagenumbers:
    url = makeUrl(number)
    print(url)


    coursepage = requests.get(url)
    parsedpage = BeautifulSoup(coursepage.text, 'html.parser')

    list_courses = parsedpage.find_all('table', class_='table_default')[6].find_all('td', class_='width')


    for i in list_courses:
        course = {}

        href = i.find('a')
        unparsedtitle = href.contents[0].replace(u'\xa0', ' ') # replace weird space with normal space
        link      = "http://catalog.century.edu/" + href['href']


        tokens = unparsedtitle.split('-')
        number = tokens[0].split(' ')[1]
        abbrev = tokens[0].split(' ')[0]
        name   = tokens[1].strip(' ')

        course['number'] = number
        course['name']   = name
        course['abbrev'] = abbrev

        specific_course = requests.get(link)
        parsed_course   = BeautifulSoup(specific_course.text, 'html.parser')
        goaltext = parsed_course.find(id='course_preview_title').parent.find_all("strong")[2].nextSibling.nextSibling

        goallist = []

        if str(goaltext).strip(' ') == "None":
            pass
        else:
            goals = goaltext.split(',')
            for g in goals:
                goalnumber = g.split(' ')[1]
                goallist.append(int(goalnumber))

        description = ""
    
        body = parsed_course.find(id='course_preview_title').parent.find_all("strong")[1]

        print("#################")
        print(link)

        while (str(body) != "<br/>" and str(body) != "<br>"):
            if body.nextSibling is None:
                break
            else:
                print(body.nextSibling)
                description += str(body.nextSibling)
                body = body.nextSibling

        course['description'] = description[:-5] #remove <br/> from end
        course['goals'] = goallist


        print(unparsedtitle)
        print(goaltext)

        print(course)

        course_list.append(course)



with open('courses_new.json', "w") as write_file:
    json.dump(course_list, write_file)



#with open('courses.csv', mode='w') as coursefile:
#    writer =  csv.writer(coursefile, delimiter='Þ', quotechar='"', quoting=csv.QUOTE_MINIMAL)
#
#
#    for course in course_list:
#    
#        name        = course['name']
#        subject     = course['abbrev']
#        number      = course['number']
#        goals       = course['goals']
#        description = course['description']
#
#        #goalsstring = str(goals)[1:-1].replace(' ', '')
#
#        writer.writerow([name, subject, number, description, goalsstring ])



