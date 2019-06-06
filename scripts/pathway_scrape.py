from bs4 import BeautifulSoup
import requests
import json

def printPathwayJson(index):
    print('Pathway: ' + jsonPathways[index]['pathway'])
    print(' Url: ' + jsonPathways[index]['url'])
    print(' ImgUrl: ' + jsonPathways[index]['imgurl'])

url = 'http://catalog.century.edu/content.php?catoid=7&navoid=374'
pathwaysPage = requests.get(url)
parsedPage = BeautifulSoup(pathwaysPage.text, 'html.parser')

tables = parsedPage.findAll("table", class_="table_default")
pathways = tables[3].find("tbody").findAll("td")

jsonPathways = []

for pathway in pathways:

    name = pathway.find('img').attrs.get('alt')
    url = pathway.find('a').attrs.get('href')
    imgUrl = pathway.find('img').attrs.get('src')
    
    jsondata = {}
    jsondata['pathway'] = name
    jsondata['url'] = url
    jsondata['imgurl'] = imgUrl

    jsonPathways.append(jsondata)


with open('pathwayNew.json', "w") as write_file:
    json.dump(jsonPathways, write_file)
