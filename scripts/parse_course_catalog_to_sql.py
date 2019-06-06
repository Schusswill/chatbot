import json
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

				
add_course = ("insert into course "
				"(name,number,subject,description,goal)"
				"values (%s,%s,%s,%s,%s)")
	
testCourse = ("Introduction to Accounting",1010,"ACCT",
				" This course covers the numerous laws pertaining to employment practice and compensation as well as computations and payment of salaries and wages and related taxes. Topics include employment recordkeeping requirements, preparation of the payroll register, individual earnings records, tax reports, and other forms required by government agencies. The accounting procedures necessary to properly prepare accounting transactions are also covered.",
				"6,8")
				
#print(testCourse)
#cursor.execute(add_course, testCourse)	

	
with open("course_catalog.json") as f:
	d = json.load(f)
	for course in d:
		goals = ''
		for goal in course['goals']:
			goals += ',' + str(goal)
		goals = goals[1:]
		data = (course['name'],course['number'],course['abbrev'],course['description'],goals)
		print (data)
		cursor.execute(add_course,data)
cnx.commit()
cursor.close()
cnx.close()