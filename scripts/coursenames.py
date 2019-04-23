import pymongo
import json

courses = pymongo.MongoClient('mongodb://IsaacNegatu:12345@ds233500.mlab.com:33500/centurychatbot')["centurychatbot"]["courses"].find({})

jsonlist = []

for course in courses:
    #dialog flow doesn't allow ( )
    subject = course['subject'].replace('(', '').replace(')' ,'')
    number  = course['number']
    title   = course['title'].replace('(', '').replace(')' ,'')

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

with open('coursetrainingset.json', "w") as write_file:
    json.dump(jsonlist, write_file)