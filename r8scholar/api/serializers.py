#REST#
from rest_framework import serializers
#Project Files#
from .models import Comment, Course, CustomUser, Department, Instructor, Review, Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'password', 'is_verified', 'verification_code')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('review_id', 'reviewer', 'nickname', 'subject', 'title','content',
        'rating', 'numb_reports','date_created', 'department_name', 'instructor_name', 
        'course_name', 'review_type')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('comment_id', 'review_id', 'name', 'content', 'child', 'date', 'numb_reports')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'course_full_name', 'department', 'rating')

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name', 'courses_rating', 'instructors_rating', 'rating')

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('name', 'department', 'rating')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('email', 'content', 'date')

class SearchSerializer(serializers.Serializer):
    instructor = InstructorSerializer(required=False)
    course = CourseSerializer(required=False)
    department = DepartmentSerializer(required=False)


#Creation serializers 
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'password',)

class CreateReviewSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Review
        fields = ('nickname','subject','title', 'content', 
        'rating','review_type')

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Comment
        fields = ('email','review_id','content')

#Review serializers
class EditReviewSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Review
        fields = ('review_id','subject','title', 'content', 
        'rating','review_type')

class DeleteReviewSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Review
        fields = ('review_id')

class ReportReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('review_id','report_description')

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