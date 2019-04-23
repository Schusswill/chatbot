#to import to mongodb
# mongoimport --uri <MONGOURI> --collection "events" --type json --file "calendarevents.json" --jsonArray

from bs4 import BeautifulSoup
import requests
import json

url = 'https://www.century.edu/home/college-calendar'
calendar_page = requests.get(url)
parsed_page = BeautifulSoup(calendar_page.text, 'html.parser')


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
      
for link in links_total:
    url = link
    calendar_page = requests.get(url)
    parsed_page = BeautifulSoup(calendar_page.text, 'html.parser')
    
    dates_total.append(parsed_page.find('span', class_='date-display-single').getText())
    
    sections = parsed_page.find_all('div', 'views-field views-field-views-conditional')
    for section in sections:
        if(section.find('span', class_='date-display-single')):
            times_total.append(section.find('span', class_='date-display-single').getText())
            
json_list = []
for i in range(0, len(titles_total)):
    json_data = dict()
    json_data['title'] = titles_total[i]
    json_data['date'] = dates_total[i]
    json_data['link'] = links_total[i]
    json_data['time'] = times_total[i]
    json_list.append(json_data)

with open('calendarevents.json', "w") as write_file:
    json.dump(json_list, write_file)
