#Django#
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.core.mail import send_mail
from django.db.models import constraints
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import uuid
from django.utils.timezone import datetime, now
#Project Files#
from .managers import CustomUserManager
from .validators import validate_brock_mail, password_validator, rating_validator
from .generators import generate_validation_code


class Comment(models.Model):
    comment_id = models.IntegerField()
    review_id = models.IntegerField()
    name = models.CharField(max_length=20)
    content = models.TextField(default=None)
    child = models.ForeignKey('self',default=None, null=True, on_delete=CASCADE)
    date = models.DateTimeField(default=None)
    numb_reports = models.IntegerField(default=None)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['comment_id', 'review_id'], name='comment_key')
        ]

class CustomUser(AbstractBaseUser):
    username = None
    email = models.EmailField(_('email'), unique=True,validators=[validate_brock_mail])
    nickname = models.CharField(max_length=20,unique=True,default=uuid.uuid4)
    password = models.CharField(max_length=32,validators=[password_validator])
    reviews = models.ForeignKey('Review',default=None, null=True,  on_delete = models.DO_NOTHING)
    comments = models.ForeignKey('Comment',default=None, null=True, on_delete = models.DO_NOTHING)
    forum_posts = models.ForeignKey('Forum',default=None, null=True, on_delete = models.DO_NOTHING)
    is_active = models.BooleanField('is_active',default=True) #Not sure if this is inherritted from AbstractUser
    is_admin = models.BooleanField(default=False)
    min_length = models.IntegerField('min_length',default=4)
    verification_code = models.CharField(max_length=10, default=generate_validation_code())
    is_verified = models.BooleanField('is_verified', default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    objects = CustomUserManager()

    def _str_(self):
        return self.email

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

class Department(models.Model):
    name = models.CharField(max_length=20,default=None,primary_key=True)
    courses_rating = models.FloatField(default=0)
    instructors_rating = models.FloatField(default=0)
    rating = models.FloatField(default=0)
        
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


class Instructor(models.Model):
    name  = models.CharField(max_length=30,primary_key=True)
    department = models.ForeignKey(Department, on_delete = models.DO_NOTHING)
    rating = models.FloatField(default=None)
    
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

class Course(models.Model):
    name = models.CharField(max_length=10, unique=True,primary_key=True)
    department = models.ForeignKey(Department, on_delete = models.DO_NOTHING)
    rating = models.FloatField(default=0)
    course_full_name  = models.CharField(max_length=30,default=None)

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


class Review(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reviewer = models.ForeignKey(CustomUser,default=None, on_delete = models.DO_NOTHING)
    nickname = models.CharField(max_length=30, default=None)
    subject = models.CharField(max_length=32)
    title = models.CharField(max_length=32)
    content = models.TextField(default=None, null=True)
    rating = models.FloatField(default=None, validators=[rating_validator])
    numb_reports = models.IntegerField(default=0)
    date_created = models.DateField(auto_now=True)
    department_name = models.ForeignKey(Department, null=True, on_delete = models.DO_NOTHING)
    instructor_name = models.ForeignKey(Instructor, null=True, on_delete=models.DO_NOTHING)
    course_name = models.ForeignKey(Course, null=True, on_delete=models.DO_NOTHING)
    review_type = models.CharField(max_length=10)

    def _str_(self):
        return self.reviewer

class Forum(models.Model):
    
    nickname_id = models.ForeignKey(CustomUser, default=None, on_delete = models.DO_NOTHING)
    title = models.CharField(max_length=40)
    comment = models.ForeignKey(Comment, on_delete = models.DO_NOTHING)

class Ticket(models.Model):
    email = models.ForeignKey(CustomUser, default=None, on_delete = models.DO_NOTHING)
    content = models.TextField(default=None, null=True)
    date = models.DateTimeField(default=None, null=True)

