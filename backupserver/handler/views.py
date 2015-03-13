from django.shortcuts import render,render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from models import JsonStore
from hashids import Hashids

hasher = Hashids(min_length=6)

@csrf_exempt
def makebackup(request):
	if request.method=='GET':
		return HttpResponse('Please send it as a POST request',status=401)
	else:
		trackreport = request.POST.get('trackreport',None)
		# validate this json and convert from str to json
		# 
		# validation ends
		if not trackreport:
			return HttpResponse('Some Error occured! Please try again later',status=401)
		"""
			first store json ,
			then with the id received, calc. hash (probably 6-letter)
			return hash.
		"""
		record = JsonStore.objects.create(trackreport = json.loads(track))
		hashed_id = hasher.encode(int(record.id))
		return HttpResponse(json.dumps({'hash':hashed_id}))

@csrf_exempt
def fetchbackup(request,hashed_id):
	"""
		Here , we fetch the JSON from db
		then fill a template to deliver that JSON
		or return a JSON itself.
	"""
	if request.method=='POST':
		return HttpResponse('Please send it as a GET request',status=401)
	else:
		id = hasher.decode(hashed_id)
		record = JsonStore.objects.filter(id = id)
		if not record:
			return HttpResponse(json.dumps({'success':False,'message':'No Backup found'}))
		else:
			trackreport = record[0].trackreport
			return HttpResponse(json.dumps({'success':True,'trackreport':trackreport}))
		