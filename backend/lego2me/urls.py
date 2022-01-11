"""lego2me URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static

#from backend.api.views import file_upload

router = routers.SimpleRouter()
router.register('imgContentView', views.imgContentView, 'imgContentView')

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('fileUpload/'),include(router.urls),
    #path('fileupload/', views.file_upload, name = 'file_upload')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)