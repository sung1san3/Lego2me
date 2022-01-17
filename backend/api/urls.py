<<<<<<< HEAD
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
]
=======
# from django.urls import path
# from . import views

# urlpatterns = [
#     path('posts/', views.PostView.as_view(), name= 'posts_list'),
# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
#from rest_framework import routers

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='Post')  

urlpatterns = router.urls
# router = DefaultRouter()
# router.register('posts', views.PostViewSet)
# urlpatterns = [
#    path('', include(router.urls)),
# ]
>>>>>>> docker
