#Feel free to delete if you are implementing this feature and dont want to use substring queries
#This is for finding the overlaps from event names and making them their own entity for dialogflow
import json
import nltk #pip install nltk
#nltk.download('punkt') #uncomment and run once to install
#nltk.download('averaged_perceptron_tagger') #uncomment and run once, then recomment
json_list = list()
with open('events2.json', "r") as rf:
    json_list = json.load(rf)

entity = list()

def titleToValue():
    for event in json_list:
        entity_dict = dict()
        entity_dict['value'] = event['title']
        entity_dict['synonyms'] = genSynonyms(event['title'])
        entity.append(entity_dict)

def remove_dup(duplicate):
    final_list = []
    for num in duplicate:
        if num not in final_list:
            final_list.append(num)
    return final_list
    
def overlap(dup):
    dictmp = {}
    tracker = []
    tracker2 = []
    ent    = {}
    ents = []
    for event in dup:
        for synonym in event['synonyms']:
            if synonym not in tracker:
                tracker.append(synonym)
                dictmp[synonym] = []
            dictmp[synonym].append(synonym)
    
    for key in dictmp:
        if(len(dictmp[key]) > 1):
            tracker2.append(key);
            
    for value in tracker2:
        for event in dup:
            for synonym in event['synonyms']:
                if synonym in tracker2:
                    event['synonyms'].remove(synonym)
    for value in tracker2:
        ents.append({'value':value,'synonyms':[value]})
        
    dup = dup + ents
    return dup


def genSynonyms(sentence):
    synonym_list = []
    synonym = ""
    tagged_sentence = nltk.pos_tag(nltk.word_tokenize(sentence))
    for tag in tagged_sentence:
        if("NN" in tag[1] or "CD" in tag[1]):
            synonym+=tag[0] + " "
            synonym_list.append(synonym)
        else:
            synonym_list.append(synonym)
            synonym = ""
        if(tag == tagged_sentence[len(tagged_sentence)-1]):
           synonym_list.append(synonym)
    while '' in synonym_list:
        synonym_list.remove('')
    synonym_list = remove_dup(synonym_list)
    
    return synonym_list

titleToValue()
entity = remove_dup(entity)
entity = overlap(entity)

#for when its read for output you uncomment this
#with open('eventEntity.json', "w") as wf:
#    json.dump(entity, wf)