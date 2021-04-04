#Django#
from django.urls import path
#Django REST framework* 
from rest_framework_simplejwt import views as jwt_views
 #token based authentication views 
#Project Files#
from .views import list_views
from .views import search_views
from .views import get_views 
from .views import filter_views 
from .views import create_views 
from .views import authentication_views 
from .views import edit_user_views 
from .views import functionality_views 
from .views import review_views
from .views import comment_views

urlpatterns = [
    #token based authentication views 
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    #list views 
    path('users/', list_views.UserView.as_view(),name='users'),
    path('reviews/', list_views.ReviewView.as_view()),
    path('comment/', list_views.CommentView.as_view()), 
    path('courses/', list_views.CourseView.as_view()), 
    path('departments/', list_views.DepartmentView.as_view()), 
    path('instructors/', list_views.InstructorView.as_view()),
    path('ticket/', list_views.TicketView.as_view()),
    #searchviews
    path('search-instructors/', search_views.SearchInstructorView.as_view()),
    path('search-courses/', search_views.SearchCourseView.as_view()),
    path('search-department/', search_views.SearchDeptView.as_view()),
    path('search/', search_views.SearchView.as_view()),
    #get views 
    path('get-user/', get_views.GetUser.as_view()), 
    path('get-reviews/', get_views.GetReviewsView.as_view()),
    path('get-comments/',get_views.GetCommentsView.as_view()),
    path('get-user-reviews/',get_views.getUserReviews.as_view()),
    path('get-course/',get_views.GetCourseView.as_view(),name='get-course'),
    path('get-department/',get_views.GetDepartmentView.as_view(),name='get-department'),
    path('get-instructor/',get_views.GetInstructorView.as_view(),name='get-instructor'),
    path('get-top-courses/', get_views.getTopCourses.as_view()), 
    path('get-top-instructors/', get_views.getTopInstructors.as_view()), 
    path('get-top-departments/', get_views.getTopDepartments.as_view()), 
    #Filter views
    path('filter-courselist/',filter_views.filterCourseListBy.as_view(),name='filter-courselist'),
    path('filter-departmentlist/',filter_views.filterDepartmentListBy.as_view(),name='filter-departmentlist'),
    path('filter-instructorlist/',filter_views.filterInstructorListBy.as_view(),name='filter-instructorlist'),
    path('filter-course-department/',filter_views.GetCoursesPerDepartment.as_view()),
    #create views 
    path('create-user/', create_views.CreateUserView.as_view(), name="create-user"), 
    path('create-review/', create_views.CreateReviewView.as_view()),
    path('create-comment/',create_views.CreateComment.as_view()),
    #Review views
    path('edit-review/',review_views.EditReviewView.as_view(),name='edit-review'),
    path('delete-review/',review_views.DeleteReviewView.as_view(),name='delete-review'),
    path('report-review/',review_views.ReportReview.as_view(),name='report-review'),
    path('upvote-review/',review_views.UpvoteReview.as_view(),name='upvote-review'),
    path('downvote-review/',review_views.DownvoteReview.as_view(),name='downvote-review'),
    #Comment views
    path('edit-comment',comment_views.EditComment.as_view(),name='edit-comment'),
    path('delete-comment',comment_views.DeleteComment.as_view(),name='delete-comment'),
    path('report-comment',comment_views.ReportComment.as_view(),name='report-comment'),
    path('upvote-comment',comment_views.UpvoteComment.as_view(),name='upvote-comment'),
    path('downvote-comment',comment_views.DownvoteComment.as_view(),name='downvote-comment'),
    #authentication views
    path('login/',authentication_views.login.as_view(),name = 'login'),
    path('logout/',authentication_views.logout.as_view(),name = 'logout'),
    #edit user views
    path('change-nickname/',edit_user_views.change_nickname.as_view(),name='change-nickname'),
    path('change-password/',edit_user_views.change_password.as_view(),name = 'change-password'),
    path('delete-profile/',edit_user_views.delete_profile.as_view(),name = 'delete-profile'),
    #functionality views 
    path('verify-user/', functionality_views.VerifyUserView.as_view())
]