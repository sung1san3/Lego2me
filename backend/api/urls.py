from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
#from rest_framework import routers
from . import views

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename = 'Post')  
urlpatterns = router.urls

urlpatterns = [
        path('', include(router.urls)),
        path('tasks/<slug:slug>/', views.Get_View.as_view()),
        path('scores/', views.Post_Score_View.as_view())
]