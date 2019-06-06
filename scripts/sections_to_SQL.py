import json
import mysql.connector as mysql
from datetime import datetime, date
			
add_section = ("insert into section "
				"(number,term,resident_tuition,nonresident_tuition,fees,subject,course_number,year,description,url,credits,campus,offered_through,location)"
				"values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)")

add_time = ("insert into times "
			"(sdate,edate,stime,etime,idsection,days,faculty_idfaculty)"
			"values (%(sdate)s,%(edate)s,%(stime)s,%(etime)s,%(idsection)s,%(days)s,%(faculty_idfaculty)s)"
			)
get_facultyid = ("select idfaculty from faculty "
				"where firstname = %s and lastname = %s;")
add_faculty = ("insert into faculty "
				"(firstname,lastname)"
				"values (%s, %s)")
config = {
	'user': 'ElC9faCSwU',
	'password': 'IMEtBLHkZN',
	'host':		'remotemysql.com',
	'port':		'3306',
	'database': 'ElC9faCSwU'
}
cnx = mysql.connect(**config)
cursor = cnx.cursor()

with open("course_section.json") as f:
	d = json.load(f)
	for course in d:
		#remove old sections
		if (course['season'] == 'Spring') and (course['year'] == 2019):
			continue
		
		#find edge cases for costs
		costs = []
		if (len(course['costs']) < 3):
			costs.append(None)
			costs.append(None)
			costs.append(None)
		else:
			costs.append(course['costs']['resident'].replace(',',''))
			costs.append(course['costs']['nonResident'].replace(',',''))
			costs.append(course['costs']['fees'].replace(',',''))
		
		#find edge cases for credits
		if(course['credits'] == "Vari."):
			credits = None
		else:
			credits = course['credits']
		sectionData = (course['section'],course['season'],costs[0],costs[1],costs[2],
						course['subject'],course['number'],course['year'],course['description'],course['url'],credits,
						course['locationDetails']['campus'],course['locationDetails']['offeredThrough'],course['locationDetails']['location'])
		print ("/////////////////////////////////////")
		print (sectionData)
		cursor.execute(add_section, sectionData)
		section_id = cursor.lastrowid
		print("/////////////////////////////////////")
		for time in course['realTimes']:
			#parse dates
			sdate, edate = time['dates'].split('-')
			sdate = sdate.split('/')
			edate = edate.split('/')
			
			
			#pares times
			if (time['time'] == 'Arranged') or (time['time'] == 'na - na') or (time['time'] == ""):
				stime = None
				etime = None
			else:
				stime, etime = time['time'].split('-')
				stime = stime[:-1]
				etime = etime[1:]
				starttime = datetime.strptime(stime,"%I:%M%p")
				endtime = datetime.strptime(etime,"%I:%M%p")
				
				
			#get idfacultiy
			if (time['instructor'] == ""):
				f_name = ('Century','Staff')
			else:
				f_lastname, f_firstname = time['instructor'].split(',')
				f_name = (f_firstname, f_lastname)
			print(f_name)
			
			
			cursor.execute(get_facultyid,f_name)
			#using a try block because I couldnd get if statements to detect the error before it happend
			#if the proff isnt in the database alredy add them
			try:
				idfacultiy = cursor.fetchone()[0]
			except TypeError as e:
				cursor.execute(add_faculty, f_name)
				idfacultiy = cursor.lastrowid
				
				
			#parse days
			if (time['days'] == ','):
				days = None
			else:
				days = time['days'][:-1]
				
			print (days)
			timeData = {
					'sdate' : date(int(sdate[2]),int(sdate[0]),int(sdate[1])),
					'edate' : date(int(edate[2]),int(edate[0]),int(edate[1])),
					'stime' : starttime,
					'etime'	: endtime,
					'idsection' : section_id,
					'days' : days,
					'faculty_idfaculty' : idfacultiy
					}
			print (timeData)
			cursor.execute(add_time, timeData)
			
cnx.commit()
cursor.close()
cnx.close()
