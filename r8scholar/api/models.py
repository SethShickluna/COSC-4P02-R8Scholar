#Django#
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
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
    email = models.EmailField(_('email'), unique=True,validators=[validate_brock_mail])
    nickname = models.CharField(max_length=20,unique=True,default=uuid.uuid4)
    password = models.CharField(max_length=32,validators=[password_validator])
    reviews = models.ForeignKey('Review',default=None, null=True,  on_delete = models.DO_NOTHING)
    comments = models.ForeignKey('Comment',default=None, null=True, on_delete = models.DO_NOTHING)
    forum_posts = models.ForeignKey('Forum',default=None, null=True, on_delete = models.DO_NOTHING)
    is_active = models.BooleanField('is_active',default=False) #Not sure if this is inherritted from AbstractUser
    min_length = models.IntegerField('min_length',default=4)
    verification_code = models.CharField(max_length=10, default=generate_validation_code())
    is_verified = models.BooleanField('is_verified', default=False)
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
    rating = models.FloatField(default=None)
    name  = models.CharField(max_length=30,default=None)
    reviews = models.ForeignKey('Review',default=None, null=True,  on_delete = models.DO_NOTHING)
    instructor = models.ForeignKey('Instructor', on_delete = models.DO_NOTHING)

class Instructor(models.Model):
    id = models.OneToOneField(Subject,primary_key=True,default=None, on_delete = models.CASCADE)
    department = models.CharField(max_length=20)
    rating = models.FloatField(default=None)
    name  = models.CharField(max_length=30,default=None)
    reviews = models.ForeignKey('Review',default=None, null=True,  on_delete = models.DO_NOTHING)

    
class Department(models.Model):
    id = models.OneToOneField(Subject,primary_key=True,default=None, on_delete = models.CASCADE)
    name = models.CharField(max_length=20,default=None)
    courses_rating = models.FloatField(default=None)
    instructors_rating = models.FloatField(default=None)
    overall_rating = models.FloatField(default=None)
    review = models.ForeignKey('Review',default=None, null=True,  on_delete = models.DO_NOTHING)



class Review(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reviewer = models.CharField(max_length=32)
    subject = models.CharField(max_length=32)
    title = models.CharField(max_length=32)
    content = models.TextField(default=None, null=True)
    rating = models.FloatField(default=None, validators=[rating_validator])
    numb_reports = models.IntegerField(default=0)
    date_created = models.DateField(auto_now=True)

    def _str_(self):
        return self.reviewer

class Forum(models.Model):
    subject_id = models.ForeignKey(Subject,default=None, on_delete = models.DO_NOTHING)
    nickname_id = models.ForeignKey(CustomUser, default=None, on_delete = models.DO_NOTHING)
    title = models.CharField(max_length=40)
    comment = models.ForeignKey(Comment, on_delete = models.DO_NOTHING)

class Ticket(models.Model):
    user = models.ForeignKey(CustomUser, default=None, on_delete = models.CASCADE)
    content = models.TextField(default=None, null=True)
    date = models.DateTimeField(default=None, null=True)

