from bs4 import BeautifulSoup
from ProgramScrape import studyInfo
import requests
import json


def checkMultipleTrack(studyBlock):
    ##If cannot find 'h3', there are multiple tracks, return true.
    if(studyBlock.findNext('h3') is None):
        return True
    else:
        return False

def appendTrack(studyBlock, pathwayName):
    tracks = studyBlock.find('img', class_='return-to').findNext('ul').findAll('a')
    programName = studyBlock.find('h1').getText()
    for track in tracks:
        trackName = track.getText()
        trackUrl = 'http://catalog.century.edu/' + track.attrs.get('href')
        studyInfo.append({'pathwayName':pathwayName, 'programName':programName, 'studyUrl':trackUrl})
        
def printStudyJson(index):
    print('Name: ' + jsonStudies[index]['name'])
    print('URL: ' + jsonStudies[index]['url'])
    print('Type: ' + jsonStudies[index]['type'])
    print('Program: ' + jsonStudies[index]['program'])
    print('Pathway: ' + jsonStudies[index]['pathway'])
    print('Credits: ' + jsonStudies[index]['credits'])
    print('Description: ' + jsonStudies[index]['description'])
    print('Contacts: ' + jsonStudies[index]['contacts'])
    print('Requirements: ')
    for requirement in jsonStudies[index]['requirements']:
        print('   ' + requirement['requirementName'] + ':')
        for course in requirement['requiredCourses']:
            print("   " + course)
    

jsonStudies = []

i = 0
while i < len(studyInfo):
    studyUrl = studyInfo[i]['studyUrl']
    studyPage = requests.get(studyUrl)
    parsedPage = BeautifulSoup(studyPage.text, 'html.parser')

    #Location of all Study related information
    studyBlock = parsedPage.find('td', class_= 'block_content_outer')

    #Check if page lists multiple tracks for the study. If so, append to array and scrape latter.
    if(checkMultipleTrack(studyBlock)):
        #print('MULTIPLE TRACK')
        appendTrack(studyBlock, studyInfo[i]['pathwayName'])
        i+=1
        continue

    jsondata = {}
    studyName = studyBlock.find('h1').getText()
    #print(str(i) + ": " + studyName)
    
    jsondata['name'] = studyName
    jsondata['url'] = studyUrl

    ##Get Study Type from studyName
    if('Certificate' in studyName):
        jsondata['type'] = 'Certificate'
    elif('Diploma' in studyName):
        jsondata['type'] = 'Diploma'
    elif('AS' in studyName):        #Associates of Science
        jsondata['type'] = 'Degree'
    elif('AF' in studyName):        #Associates of Fine Arts
        jsondata['type'] = 'Degree'
    else:
        jsondata['type'] = 'Other'

    ##Pathway and Program the study resides in
    jsondata['pathway'] = studyInfo[i]['pathwayName']
    jsondata['program'] = studyInfo[i]['programName']


    ##Get Credits, Descriptions and Contacts
    parameters = studyBlock.findAll('h3')
    for parameter in parameters:
        name = parameter.getText()
        if('Credit' in name):
            if(parameter.find('a') is None):
                jsondata['credits'] = name
            elif('Credit' in parameter.find('a').getText()):
                jsondata['credits'] = parameter.find('a').getText()
            else:
                jsondata['credits'] = parameter.find('a').findNext().getText().strip()
        elif('Description' in name):
            description = ""
            paragraph = parameter.findNext()
            #Get all paragraphs in description
            while(paragraph.name == 'p'):
                description += ' ' + paragraph.getText()
                paragraph = paragraph.findNext()
                
            jsondata['description'] = description.strip()
        elif('Contact' in name):
            jsondata['contacts'] = parameter.findNext('p').getText()


    jsondata['requirements'] = []

    ##Get the requirements for the program
    requirements = studyBlock.find('a', {'name' : 'ProgramRequirements'}).findParent().findParent().findParent().findAll('h3')
    
    ##Get the courses for each of the "core" requirements 
    for requirement in requirements:
        #Filters for the "core" requirements only
        if(requirement.find('a') is None):
            continue
        elif('Requirement' not in requirement.find('a').attrs.get('name')): #Filter any h3 tags that are not requirements
            continue
        elif('Mn' in requirement.find('a').attrs.get('name')): #Non-"core" requirements start at MnTC/General Education Requirement
            break

        requirementName = requirement.find('a').attrs.get('name')
        
        courseBlock = requirement.findNext('hr').findNext('ul')
        courses = []
        
        for course in courseBlock:
            if(course.name != 'li'):
                continue
            elif(course.find('a') is None):
                continue
            else:
                courses.append(course.find('a').getText())

        jsondata['requirements'].append({'requirementName':requirementName, 'requiredCourses':courses})

    jsonStudies.append(jsondata)
    i += 1


with open('studyNew.json', "w") as write_file:
    json.dump(jsonStudies, write_file)