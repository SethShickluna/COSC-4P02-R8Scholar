#python 
import uuid
from django.db.models.fields.related import ManyToManyField
#Django#
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.core.mail import send_mail
from django.db.models import constraints
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from django.utils.timezone import datetime, now
#Project Files#
from .managers import CustomUserManager
from .validators import profanity_validator, validate_brock_mail, password_validator, rating_validator
from .generators import generate_validation_code, determine_type

#Models a user of the site
class CustomUser(AbstractBaseUser):
    username = None
    email = models.EmailField(_('email'), unique=True,validators=[validate_brock_mail])
    nickname = models.CharField(max_length=25,unique=True,default=uuid.uuid4,validators=[profanity_validator])
    password = models.CharField(max_length=100,validators=[password_validator])
    is_active = models.BooleanField('is_active',default=True) #Not sure if this is inherritted from AbstractUser
    is_admin = models.BooleanField(default=False)
    min_length = models.IntegerField('min_length',default=4)
    verification_code = models.CharField(max_length=10, default=generate_validation_code())
    is_verified = models.BooleanField('is_verified', default=False)
    date_created = models.DateField(auto_now=True)
    last_pass_reset = models.DateField(null=True)
    is_prof = models.BooleanField(default=False,null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    objects = CustomUserManager()

    def _str_(self):
        return self.email

    def set_is_prof(self, email):
        self.is_prof = not any(i.isdigit() for i in str(email))

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

#Models a department at Brock University
class Department(models.Model):
    name = models.CharField(max_length=100,default=None,primary_key=True)
    courses_rating = models.FloatField(default=0)
    instructors_rating = models.FloatField(default=0)
    rating = models.FloatField(default=0)
    course_full_name= models.CharField(max_length=30, default=None, null=True)
    number_ratings = models.IntegerField(default=0)
    percent_recommend = models.FloatField(default=0)

    class Meta:
        ordering = ['name']
        
    def update_rating(self): # NEEDS TESTING #
        count = 0
        my_sum = 0
        #get reviews that we are a subject of 
        for review in Review.objects.filter(department_name=self.name): #O(n) 
            my_sum += review.rating
            count +=1 
        #store their ratings and sum 
        #set rating to new average 
        self.rating = (my_sum / count)
        self.save()
    
    def update_instructor_rating(self):
        count = 0
        my_sum = 0
        #for each instructor in the department 
        for instructor in Instructor.objects.filter(department=self.name):
            for review in Review.objects.filter(instructor_name=instructor):
                my_sum += review.rating
                count +=1
        self.instructors_rating = my_sum / count
        self.save()

    def update_course_rating(self):
        count = 0
        my_sum = 0
        #for each instructor in the department 
        for course in Course.objects.filter(department=self.name):
            print(course)
            for review in Review.objects.filter(course_name=course):
                print(review)
                my_sum += review.rating
                count +=1
        self.courses_rating = my_sum / count
        self.save()
    
    def updatePercent(self):
        try:
            numbWould = Review.objects.filter(subject=name,would_take_again=True).count()
            numbWouldnt = Review.objects.filter(subject=name,would_take_again=False).count()
        except Review.DoesNotExist:
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        self.percent_recommend = (numbWould/(numbWould+numbWouldnt))*100
        self.save()
        
    def updateNumReviews(self):
        try:
            count = Review.objects.filter(subject=name).count()
        except Review.DoesNotExist:
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        self.number_ratings = count
        self.save()

#Models an instructor(individual who teaches a course)
class Instructor(models.Model):
    name  = models.CharField(max_length=50,primary_key=True)
    department = models.ForeignKey(Department, on_delete = models.DO_NOTHING)
    rating = models.FloatField(default=None)
    course_full_name= models.CharField(max_length=30, default=None, null=True)
    number_ratings = models.IntegerField(default=0)
    percent_recommend = models.FloatField(default=0)

    class Meta:
        ordering = ['name']
    
    def update_rating(self): # NEEDS TESTING #
        count = 0
        my_sum = 0
        #get reviews that we are a subject of 
        for review in Review.objects.filter(instructor_name=self.name): #O(n) 
            my_sum += review.rating
            count +=1 
        #store their ratings and sum 
        #set rating to new average 
        self.rating = (my_sum / count)
        self.save()
    
    def updatePercent(self):
        try:
            numbWould = Review.objects.filter(subject=name,would_take_again=True).count()
            numbWouldnt = Review.objects.filter(subject=name,would_take_again=False).count()
        except Review.DoesNotExist:
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        self.percent_recommend = (numbWould/(numbWould+numbWouldnt))*100
        self.save()
        
    def updateNumReviews(self):
        try:
            count = Review.objects.filter(subject=name).count()
        except Review.DoesNotExist:
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        self.number_ratings = count
        self.save()

#Models a course being offered by Brock University
class Course(models.Model):
    name = models.CharField(max_length=40, unique=True,primary_key=True)
    department = models.ForeignKey(Department, on_delete = models.DO_NOTHING)
    rating = models.FloatField(default=0)
    course_full_name  = models.CharField(max_length=40,default=None)
    number_ratings = models.IntegerField(default=0)
    percent_recommend = models.FloatField(default=0)

    class Meta:
        ordering = ['name', 'course_full_name']

    def updatePercent(self):
        try:
            numbWould = Review.objects.filter(subject=name,would_take_again=True).count()
            numbWouldnt = Review.objects.filter(subject=name,would_take_again=False).count()
        except Review.DoesNotExist:
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        self.percent_recommend = (numbWould/(numbWould+numbWouldnt))*100
        self.save()
        
    def updateNumReviews(self):
        try:
            count = Review.objects.filter(subject=name).count()
        except Review.DoesNotExist:
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        self.number_ratings = count
        self.save()

    def update_rating(self): # NEEDS TESTING #
        count = 0
        my_sum = 0
        #get reviews that we are a subject of 
        for review in Review.objects.filter(course_name=self.name): #O(n) 
            my_sum += review.rating
            count +=1 
        #store their ratings and sum 
        #set rating to new average 
        self.rating = (my_sum / count)
        self.save()

    

#Tags for reviews
class Tags(models.Model):
    description = models.CharField(max_length=50,default=None)
    subject = models.CharField(max_length=50,default=None)

#Models a review of a course/instructor/department created by user 
class Review(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #Relates user to review
    reviewer = models.ForeignKey(CustomUser,default=None, on_delete = models.CASCADE)
    #User's nickname
    nickname = models.CharField(max_length=30, default=None)
    #The instructor/course/department this review is related to
    subject = models.CharField(max_length=100)
    #The title of the review
    title = models.CharField(max_length=45)
    #The content of the review, i.e what the reviewer wrote about the subject of the review
    content = models.TextField(default=None, null=True)
    #A rating between 1-5 representing the quality of the subject
    rating = models.FloatField(default=None, validators=[rating_validator])
    #Indicates whether the reviewer would take again or recommend the subject
    would_take_again = models.BooleanField(default=False)
    #Fields for giving other users ability to thumbs up/down a review
    thumbs_up = models.IntegerField(default=0)
    thumbs_down = models.IntegerField(default=0)
    #Each review can have three tags
    tag_1 = models.CharField(max_length=100, default=None)
    tag_2 = models.CharField(max_length=100, default=None)
    tag_3 = models.CharField(max_length=100, default=None)
    #Number of times this review has been reported
    numb_reports = models.IntegerField(default=0)
    #Users who have reported this review
    users_reported = ManyToManyField(CustomUser,related_name='users_reported')
    #The date this review was initially created
    date_created = models.DateField(auto_now=True)
    department_name = models.ForeignKey(Department, null=True, on_delete = models.DO_NOTHING)
    instructor_name = models.ForeignKey(Instructor, null=True, on_delete=models.DO_NOTHING)
    course_name = models.ForeignKey(Course, null=True, on_delete=models.DO_NOTHING)
    review_type = models.CharField(max_length=25)

    def _str_(self):
        return self.reviewer

#Models a comment made by a user on a review 
class Comment(models.Model):
    comment_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #Relates review to comment
    review = models.ForeignKey(Review,default=None, on_delete = models.CASCADE)
    #Relates user to comment
    commenter = models.ForeignKey(CustomUser,default=None, on_delete = models.CASCADE)
    name = models.CharField(max_length=32)
    content = models.TextField(default=None)
    #Fields for giving other users ability to thumbs up/down a comment
    thumbs_up = models.IntegerField(default=0)
    thumbs_down = models.IntegerField(default=0)
    child = models.ForeignKey('self',default=None, null=True, on_delete=CASCADE)
    date_created = models.DateField(auto_now=True)
    numb_reports = models.IntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['comment_id'], name='comment_key')
        ]


class Ticket(models.Model):
    email = models.ForeignKey(CustomUser, default=None, on_delete = models.DO_NOTHING)
    content = models.TextField(default=None, null=True)
    date = models.DateTimeField(default=None, null=True)