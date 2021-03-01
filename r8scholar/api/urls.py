#Django#
from django.urls import path, include
#Project Files#
from . import views

urlpatterns = [
    #list views 
    path('users', views.UserView.as_view()),
    path('reviews', views.ReviewView.as_view()),
    path('comment', views.CommentView.as_view()), 
    path('courses', views.CourseView.as_view()), 
    path('departments', views.DepartmentView.as_view()), 
    path('instructors', views.InstructorView.as_view()),
    path('forum', views.ForumView.as_view()), 
    path('ticket', views.TicketView.as_view()),
    #get views 
    path('get-user', views.GetUser.as_view()), 
    path('get-reviews', views.GetReviewsView.as_view()), 
    #create views 
    path('create-user', views.CreateUserView.as_view()), 
    path('create-review', views.CreateReviewView.as_view()), 
    #authentication views
    path('login/',views.login.as_view(),name = 'login'),
    path('logout',views.logout.as_view(),name = 'logout'),
    path('change-password',views.change_password.as_view(),name = 'change-password'),
    #functionality views 
    path('verify-user', views.VerifyUserView.as_view())
]