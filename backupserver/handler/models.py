from django.db import models
from jsonfield import JSONField

# Create your models here.
class JsonStore(models.Model):
	"""stores JSON against timestamp and hash"""
	trackreport = JSONField()
	timestamp = models.DateTimeField(auto_now_add = True)