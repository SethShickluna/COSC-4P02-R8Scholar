#REST#
from rest_framework import serializers
#Project Files#
from .models import Comment, Course, CustomUser, Department, Instructor, Review, Ticket
from .validators import password_validator

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True
    )
    nickname = serializers.CharField()
    password = serializers.CharField(min_length=10, write_only=True, validators=[password_validator])
    class Meta:
        model = CustomUser
        fields = ('email', 'nickname', 'is_verified', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


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
        fields = ('email', 'verification_code',)