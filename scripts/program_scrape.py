from bs4 import BeautifulSoup
from PathwayScrape import pathways
import requests
import json

def printProgramJson(index):
    print('Program: ' + jsonPrograms[index]['program'])
    print('Pathway: ' + jsonPrograms[index]['pathway'])
    
    print(' Degrees: ')
    for degree in jsonPrograms[index]['degrees']:
        print('   ' + degree['name'] + ',  URL: ' + degree['url'])
        
    print(' Diplomas: ')
    for diploma in jsonPrograms[index]['diplomas']:
        print('   ' + diploma['name'] + ',  URL: ' + diploma['url'])
        
    print(' Certificates: ')
    for certificate in jsonPrograms[index]['certificates']:
        print('   ' + certificate['name'] +  ',  URL: ' + certificate['url'])
        

jsonPrograms = []
studyInfo = []

for pathway in pathways:
    
    programsPage = requests.get(pathway.find('a').attrs.get('href'))
    parsedPage = BeautifulSoup(programsPage.text, 'html.parser')

    programs = parsedPage.findAll('h3')
    uls = []

    hasNextUl = True
    ul = programs[0].findNext('ul')

    if(str(ul) == "None" or ul.find_previous_sibling('h4').getText() != 'Programs'):
        hasNextUl = False
        
    while(hasNextUl):
        uls.append(ul)
        ul = ul.findNext('ul')
        if(str(ul) == "None" or ul.find_previous_sibling('h4').getText() != 'Programs'):
            hasNextUl = False

    

    for program in programs:
        jsondata = {}
        jsondata['program'] = program.getText()
        jsondata['pathway'] = pathway.find('img').attrs.get('alt')
        jsondata['degrees'] = []
        jsondata['diplomas'] = []
        jsondata['certificates'] = []
        
        programName = program.getText()
        degrees = []
        diplomas = []
        certificates = []

        
        for ul in uls:
            if(ul.find_previous('h3').getText() != programName):
                continue
            progType = ul.find_previous('strong').getText()
            items = ul.findAll('li')
            for item in items:
                #progType = item.find_previous('strong').getText()
                
                itemName = item.find('a').getText()
                itemUrl = 'http://catalog.century.edu/' + item.find('a').attrs.get('href')
                studyInfo.append({'pathwayName':pathway.find('img').attrs.get('alt'), 'programName':program.getText(), 'studyUrl':itemUrl})
                
                if(progType == 'Degree'):
                    jsondata['degrees'].append({"name":itemName, "url":itemUrl})

                if(progType == 'Diploma'):
                    jsondata['diplomas'].append({"name":itemName, "url":itemUrl})

                if(progType == 'Certificate'):
                    jsondata['certificates'].append({"name":itemName, "url":itemUrl})

        jsonPrograms.append(jsondata)

with open('programNew.json', "w") as write_file:
    json.dump(jsonPrograms, write_file)
