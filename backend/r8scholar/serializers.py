from rest_framework import serializers
from .models import Comment, Course, CustomUser, Department, Forum, Instructor, Review, Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'reviews', 'comments', 'forum posts')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('review_id', 'reviewer', 'id','content', 'rating', 'date', 'numb_reports')

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
        fields = ('name', 'course rating', 'instructor rating', 'overall rating', 'review')

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('name', 'department', 'rating', 'reviews')

class ForumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = ('title', 'comment')

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('user', 'content', 'date')
