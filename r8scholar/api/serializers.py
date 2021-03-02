#REST#
from rest_framework import serializers
#Project Files#
from .models import Comment, Course, CustomUser, Department, Forum, Instructor, Review, Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'password', 'is_verified', 'verification_code','reviews', 'comments', 'forum_posts')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('review_id', 'nickname', 'subject','title', 'content', 'instructor_rating','course_rating', 'numb_reports', 'date_created', 'department_name', 'instructor_name')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('comment_id', 'review_id', 'name', 'content', 'child', 'date', 'numb_reports')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('code', 'course_name', 'department', 'rating', 'reviews', 'instructor_name')

class DeparmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('department_name', 'courses_rating', 'instructors_rating', 'overall_rating', 'review')

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('instructor_name', 'department_name', 'instructor_rating', 'reviews')

class ForumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = ('nickname_id', 'title', 'comment')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('email', 'content', 'date')

#Creation serializers 
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'password',)

class CreateReviewSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Review
        fields = ('nickname','title', 'content', 'instructor_rating','course_rating','code', 'instructor_name',)

#Authentication serializers
class loginLogoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email','password',)

#verification serializers 
class VerificationSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = CustomUser
        fields = ('verification_code',)