from bs4 import BeautifulSoup
import requests
import json


baseurl = 'https://www.century.edu/home/directory'

facultypage = requests.get(baseurl)
parsedpage = BeautifulSoup(facultypage.text, 'html.parser')

faculty = parsedpage.find('tbody').find_all('tr')

jsonlist = []

jsonlistfirstname = []

jsonlistlastname  = []

for row in faculty:

    columns = row.find_all('td')
    name = columns[0].contents[0].replace('\n','').replace('\t', '').strip(' ')

    if len(columns[0].contents) > 2:
        occupation = columns[0].contents[2].replace('\n','').replace('\t', '').strip(' ')
    else:
        occupation = ''


    maybelocation = columns[2].find('a')
    if maybelocation is None:
        location = ''
    else:
        location = maybelocation.contents[0].replace('\n','').replace('\t', '').strip(' ')


    department = columns[1].contents[0].replace('\n','').replace('\t', '').strip(' ')

    phonenumber = columns[3].contents[0].replace('\n','').replace('\t', '').strip(' ')

    brokenname = name.split(' ', 1)
    firstname  = brokenname[0]
    lastname   = brokenname[1]

    jsondata = {}
    jsondata['originalname'] = name
    jsondata['fullname']     = lastname + "," + firstname
    jsondata['occupation']   = occupation
    jsondata['department']   = department
    jsondata['location']     = location
    jsondata['phonenumber']  = phonenumber
    jsonlist.append(jsondata)

    jsondatafirstname = {}
    jsondatafirstname['value']    = firstname
    jsondatafirstname['synonyms'] = [firstname, firstname.lower()]

    jsonlistfirstname.append(jsondatafirstname)

    jsondatalastname = {}
    jsondatalastname['value']    = lastname
    jsondatalastname['synonyms'] = [lastname, lastname.lower()]
    jsonlistlastname.append(jsondatalastname)


    print(jsondata)


with open('namescrap.json', "w") as write_file:
    json.dump(jsonlist, write_file)

with open('firstnames.json', 'w') as write_file:
    json.dump(jsonlistfirstname, write_file)

with open('lastnames.json',  'w') as write_file:
    json.dump(jsonlistlastname, write_file)

