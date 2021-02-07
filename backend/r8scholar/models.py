from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db.models import constraints
from django.db.models.deletion import CASCADE
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager

# Create your models here.


class Comment(models.Model):
    comment_id = models.IntegerField()
    review_id = models.IntegerField()
    name = models.CharField(max_length=20)
    content = models.TextField(default=None)
    child = models.ForeignKey('Comment',default=None, null=True, on_delete=CASCADE)
    date = models.DateTimeField(default=None)
    numb_reports = models.IntegerField(default=None)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['comment_id', 'review_id'], name='comment_key')
        ]

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    nickname = models.CharField(max_length=20, default='Anonymous', unique=True)
    reviews = models.ForeignKey('Review',default=None, null=True,  on_delete = models.DO_NOTHING)
    comments = models.ForeignKey('Comment',default=None, null=True, on_delete = models.DO_NOTHING)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def _str_(self):
        return self.email

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)

class Subject(models.Model):
    #subject_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=202)

class Course(models.Model):
    id = models.OneToOneField(Subject,primary_key=True,default=None,  on_delete = models.CASCADE)
    code = models.CharField(max_length=10, unique=True)
    department = models.CharField(max_length=20)
    rating = models.IntegerField(default=None)
    name  = models.CharField(max_length=30,default=None)

class Instructor(models.Model):
    id = models.OneToOneField(Subject,primary_key=True,default=None, on_delete = models.CASCADE)
    department = models.CharField(max_length=20)
    rating = models.IntegerField(default=None)
    name  = models.CharField(max_length=30,default=None)
    
class Department(models.Model):
    id = models.OneToOneField(Subject,primary_key=True,default=None, on_delete = models.CASCADE)
    name = models.CharField(max_length=20,default=None)
    courses_rating = models.IntegerField(default=None)
    instructors_rating = models.IntegerField(default=None)



class Review(models.Model):
    review_id = models.IntegerField(primary_key=True)
    reviewer = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    id = models.ForeignKey(Subject, on_delete = models.CASCADE, null=True)
    content = models.TextField(default=None, null=True)
    rating = models.IntegerField(default=None,null=True)
    date = models.DateTimeField(default=None, null=True)
    numb_reports = models.IntegerField(default=None)


    def _str_(self):
        return self.reviewer

class Forum(models.Model):
    subject_id = models.ForeignKey(Subject,default=None, on_delete = models.DO_NOTHING)
    title = models.CharField(max_length=40)
    comment = models.ForeignKey(Comment, on_delete = models.DO_NOTHING)




