from django.urls import path, include
from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.index),
    path('login/', views.index),
    path('signup/', views.index),
    path('course/<str:courseName>/', views.index),
    path('department/<str:deptName>/', views.index),
    path('instructor/<str:profName>/', views.index),
    path('verify/', views.index), 
    path('search/<str:query>/', views.index), 
    path('courses/', views.index), 
    path('instructors/', views.index), 
    path('departments/', views.index), 
    path('account/', views.index),
    path('forum/', views.index),
    path('signout/', views.index),
    path('settings/', views.index), 
    path('profile/', views.index),
]