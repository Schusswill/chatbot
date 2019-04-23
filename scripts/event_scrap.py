from bs4 import BeautifulSoup
import requests
import json

url = 'https://www.century.edu/home/events'
eventspage = requests.get(url)
parsedpage = BeautifulSoup(eventspage.text, 'html.parser')

events = parsedpage.find('div', class_='view-content').find_all('div', class_='item-list')

jsonlist = []

for event in events:
    print("====")
    date  = event.find('h3').find('span').contents[0]
    title = event.find('div', class_='views-field-title').find('a')
    time  = event.find('div', class_='views-field-field-start-date-2').find('span').contents[0]
    body  = event.find('div', class_='views-field-body').find('p').getText()
    print(title.getText())
    print('https://www.century.edu' + title.get('href'))
    print(date)
    print(time)
    print(body)

    jsondata = {}
    jsondata['date']    = date
    jsondata['title']   = title.getText()
    jsondata['link']    = 'https://www.century.edu' + title.get('href')
    jsondata['time']    = time
    jsondata['body']    = body

    jsonlist.append(jsondata)

with open('events_scrap.json', "w") as write_file:
    json.dump(jsonlist, write_file)

