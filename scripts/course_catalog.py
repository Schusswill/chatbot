from bs4 import BeautifulSoup
import requests
import json

def makeUrl(number):
    return "http://catalog.century.edu/content.php?catoid=5&catoid=3&navoid=118&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D=" + str(number) + "#acalog_template_course_filter"



#manually saw how many pages at
#http://catalog.century.edu/content.php?catoid=3&navoid=118
pages = [1,2,3,4,5,6,7,8,9,10,11]

jsonlist = []

for page in pages:
    coursepage = requests.get(makeUrl(page))
    parsedpage = BeautifulSoup(coursepage.text, 'html.parser')

    courses = parsedpage.find_all('td', class_='width')

    for course in courses:
        #\xa0 is non breaking space
        info = course.find('a').contents[0].replace(u'\xa0', u' ')
        code   = info.split('-')[0].strip(' ')
        title  = info.split('-')[1].strip(' ')

        subject = code.split(' ')[0]
        number  = code.split(' ')[1]


        synonyms = []
        jsondata = {}


        synonyms.append(subject + "-" + number)
        synonyms.append(subject.lower() + "-" + number)
        synonyms.append(subject + " - " + number)
        synonyms.append(subject.lower() + " - " + number)
        synonyms.append(subject + number)
        synonyms.append(subject.lower() + number)
        synonyms.append(subject + " " + number)
        synonyms.append(subject.lower() + " " + number)
        synonyms.append(title)
        synonyms.append(title.lower())


        jsondata['synonyms'] = synonyms
        jsondata['value']     = subject + '-' + number
        jsonlist.append(jsondata)
        print(jsondata)

with open('allcourses.json', "w") as write_file:
    json.dump(jsonlist, write_file)

