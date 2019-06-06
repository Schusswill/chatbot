import xml.etree.ElementTree as ET
import mysql.connector as mysql
config = {
	'user': 'ElC9faCSwU',
	'password': 'IMEtBLHkZN',
	'host':		'remotemysql.com',
	'port':		'3306',
	'database': 'ElC9faCSwU'
}
cnx = mysql.connect(**config)
cursor = cnx.cursor()
add_faculty = ("Insert into faculty "
				"(idfaculty,firstname,lastname,location,department,title,phone,email)"
				"values (%s, %s, %s, %s, %s, %s, %s, %s)")
#data = (1,'emily','Aamoth','W 2470','Testing Center','Assessment outreach Rep','651-779-3940','emil.aamoth@century.edu')

root = ET.parse('directory.xml').getroot()
index = 1
for child in root:
	data = (index, child[0].text,child[1].text,child[2].text,child[3].text,child[4].text,child[5].text,child[6].text)
	print(data)
	cursor.execute(add_faculty,data)
	index += 1

cnx.commit()
cursor.close()
cnx.close