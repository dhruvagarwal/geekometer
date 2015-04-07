import cgi
from google.appengine.ext import db
import webapp2
import json

class Backups(db.Model):
	id = db.StringProperty()
	email_id = db.StringProperty(indexed=True)
	done = db.TextProperty(default="{}",null=True)
	important = db.TextProperty(default="{}",null=True)
	last_backup = db.DateTimeProperty(auto_now_add=True)

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
		params = dict(self.request.params)
		email_id = params.get('email_id',None)
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
		self.response.write(json.dumps({'token':1,'success':True}))

# add decorator to validate ID(encryption based)
class fetchBackup(webapp2.RequestHandler):
	def get(self):
		self.response.set_status(400)
		self.response.write('<center><h1>Sorry, bad request!</h1></center>')

	def post(self):
		params = dict(self.request.params)
		email_id = params.get('email_id',None)
		token = params.get('token',None)
		# use email id and token to query the db
		# if not found send empty JSON
		# else fetch the data and important markers and send it back as JSON
		self.response.write(json.dumps({
				# json of data and important
			}))

application = webapp2.WSGIApplication([
	('/', home),
	('/backup', backup),
], debug=True)
