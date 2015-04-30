import cgi
from google.appengine.ext import db
import webapp2
import json

class Backups(db.Model):
	id = ndb.StringProperty(indexed=True)
	email = ndb.StringProperty(indexed=False,null=True)
	done = ndb.TextProperty(default="{}")
	important = ndb.TextProperty(default="{}")
	last_backup = ndb.DateTimeProperty(auto_now_add=True)

class home(webapp2.RequestHandler):
	def get(self):
		self.response.write('hello')

	def post(self):
		self.response.write('hello')

# add decorator to validate ID(encryption based)
class backup(webapp2.RequestHandler):
	def get(self):
		self.response.set_status(400)
		self.response.write('<center><h1>Sorry, bad request!</h1></center>')

	def post(self):
		try:
			params = dict(self.request.params)
			id = params.get('token',None) # unique ID for each email
			email = params.get('email',None)
			done = params.get('done',None)
			important = params.get('important',None)
			if done:done = json.loads(done)
			if important:important = json.loads(done)
			# all things loaded,go ahead
			# if the entry doesn't exist
			# 		create a new one and store id
			# else
			# 		just update the entry and get the id
			# return this ID with a bool(success)
			new_user = False
			Backup = Backups.query(Backups.id=id)
			if len(Backup)>0:
				new_user = True
				print Backup
				Backup = Backup[0]
			else:
				Backup = Backups(id=id,email=email)
			if done and done != "":
				Backup.done = done
			if important and important != "":
				Backup.important = important
			Backup.put()

			self.response.write(json.dumps({'new_user':new_user,'success':True}))
		except:
			print traceback.format_exc()
			self.response.set_status(501) # Not Implemented
			self.response.write(json.dumps({'success':False}))

# add decorator to validate ID(encryption based)
class fetchBackup(webapp2.RequestHandler):
	def get(self):
		self.response.set_status(400)
		self.response.write('<center><h1>Sorry, bad request!</h1></center>')

	def post(self):
		params = dict(self.request.params)
		email = params.get('email',None)
		id = params.get('token',None)
		# use email id and token to query the db
		# if not found send empty JSON
		# else fetch the data and important markers and send it back as JSON
		Backup = Backups.query(id=id)
		if len(Backup)>0:
			try:
				Backup = Backup[0]
				done = Backup.done
				important = Backup.important
				if email!=Backup.email:
					# temporary workaround
					# have to think something better for it 
					Backup.email = email
					Backup.put()

				self.response.write(json.dumps({
						"done":done,
						"important":important,
						"success":True
					}))
			except:
				print traceback.format_exc()
				self.response.set_status(500)
				self.response.write(json.dumps{"success":False})
		else:
			self.response.set_status(401)
			self.response.write(json.dumps("new_user":True,success:True))

application = webapp2.WSGIApplication([
	('/', home),
	('/backup', backup),
	('/fetch',fetchBackup)
], debug=True)
