#this scraps from: 
#  https://www.century.edu/home/events
#  https://www.century.edu/home/college-calendar
#and puts the data into event.json

#to import to mongodb
#mongoimport --uri <MONGOURI> --collection "events" --type json --file "events.json" --jsonArray
from bs4 import BeautifulSoup
import requests
import json

json_list = []

##Scrap events from:
##https://www.century.edu/home/events
def homeEvents(pageNumber=0):
    page = ""
    if(pageNumber >= 1):
        page = '?page=' + str(pageNumber);
    
    url = 'https://www.century.edu/home/events' + page
    eventspage = requests.get(url)
    parsedpage = BeautifulSoup(eventspage.text, 'html.parser')
    
    events = parsedpage.find('div', class_='view-content')
    events = events.find_all('div', class_='item-list')
    for event in events:
        date  = event.find('h3').find('span').contents[0]
        title = event.find('div', class_='views-field-title').find('a')
        time  = event.find('div', class_='views-field-field-start-date-2').find('span').contents[0]
    
        jsondata = {}
        jsondata['title']   = title.getText()
        jsondata['date']    = date
        jsondata['link']    = 'https://www.century.edu' + title.get('href')
        jsondata['time']    = time
    
        json_list.append(jsondata)

    nextpage = parsedpage.findAll('li', class_='pager__item pager__item--next')
    print('homeEvents() page', pageNumber, 'complete')
    
    if nextpage:
        #print('nextpage')
        pageNumber+=1
        homeEvents(pageNumber)

##Scrap events from:
##https://www.century.edu/home/college-calendar
def calendarEvents():
    url = 'https://www.century.edu/home/college-calendar'
    calendar_page = requests.get(url)
    parsed_page = BeautifulSoup(calendar_page.text, 'html.parser')
    #json_list = []
    
    
    semesters = parsed_page.find('div', class_='view-content').find_all('div', class_='item-list')
    titles_total = []
    dates_total = []
    links_total = []
    times_total = []

    for semester in semesters:
        titles_temp = semester.find_all('div', class_='views-field views-field-title')
        for title in titles_temp:
            titles_total.append(title.getText())
            
        links_temp = semester.find_all('h4')
        for link in links_temp:
            links_total.append("https://www.century.edu" + link.find('a').get('href'))

    percentage = 0.0
    percentageTotal = len(links_total) + 0.0
    for link in links_total:
        percentage+=1
        url = link
        calendar_page = requests.get(url)
        parsed_page = BeautifulSoup(calendar_page.text, 'html.parser')
        
        dates_total.append(parsed_page.find('span', class_='date-display-single').getText())
        
        sections = parsed_page.find_all('div', 'views-field views-field-views-conditional')
        for section in sections:
            if(section.find('span', class_='date-display-single')):
                times_total.append(section.find('span', class_='date-display-single').getText())
        print('calendarEvents()', int((percentage / percentageTotal) * 100), '%')
                
    for i in range(0, len(titles_total)):
        json_data = dict()
        json_data['title'] = titles_total[i]
        json_data['date'] = dates_total[i]
        json_data['link'] = links_total[i]
        json_data['time'] = times_total[i]
        json_list.append(json_data)
    #print(json_list[0])
    print('calendarEvents() complete')
    
def delDup():
    dupList = []
    json_size = len(json_list)
    for i in range(json_size):
        flink = json_list[i]['link']
        for j in range(i+1, json_size):
            nlink = json_list[j]['link']
            if(flink == nlink):
                dupList.append(json_list[j])
    for dup in dupList:
        #print(dup)
        json_list.remove(dup)
    

print('homeEvents() scrap inprogress...')
homeEvents()
print('calendarEvents() scrap inprogress...')
calendarEvents()
print('delDup() in progress')
print('len(json_list) before delDup():', len(json_list))
delDup()
print('len(json_list) after  delDup():', len(json_list))

with open('events.json', "w") as write_file:
    print('written to events.json')
    json.dump(json_list, write_file)