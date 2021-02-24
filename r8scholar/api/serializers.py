from rest_framework import serializers
from .models import Comment, Course, CustomUser, Department, Forum, Instructor, Review, Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'password' ,'reviews', 'comments', 'forum_posts')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('review_id', 'reviewer', 'subject','title', 'content', 'rating', 'numb_reports', 'date_created', )

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('comment_id', 'review_id', 'name', 'content', 'child', 'date', 'numb_reports')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('code', 'name', 'department', 'rating', 'reviews', 'instructor')

class DeparmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name', 'courses_rating', 'instructors_rating', 'overall_rating', 'review')

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('name', 'department', 'rating', 'reviews')

class ForumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = ('nickname_id', 'title', 'comment')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('user', 'content', 'date')

#create serializers 
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'password')

class CreateReviewSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Review
        fields = ('reviewer', 'subject','title', 'content', 'rating', )
