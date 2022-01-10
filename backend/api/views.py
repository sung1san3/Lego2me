from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .. import FileManager as fm
# Create your views here.

@csrf_exempt
@require_POST
def recommend_user_prod(request):
    fm.handle_uploaded_file(request.FILES['file'])
    response = HttpResponse("ok")
    response.status_code = 200
    return response