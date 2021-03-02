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


class Instructor(models.Model):
    department_name = models.CharField(max_length=20)
    instructor_rating = models.FloatField(default=None)
    instructor_name  = models.CharField(max_length=30,primary_key=True)


class Course(models.Model):
    code = models.CharField(max_length=10, unique=True,primary_key=True)
    department_name = models.CharField(max_length=20)
    course_rating = models.FloatField(default=0)
    course_name  = models.CharField(max_length=30,default=None)
    # instructor_name = models.CharField(max_length=30)
    instructor_name = models.ForeignKey(Instructor, on_delete = models.DO_NOTHING)

    
class Department(models.Model):
    department_name = models.CharField(max_length=20,default=None,primary_key=True)
    courses_rating = models.FloatField(default=0)
    instructors_rating = models.FloatField(default=0)
    overall_rating = models.FloatField(default=0)


class Review(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nickname = models.ForeignKey(CustomUser,default=None, on_delete = models.DO_NOTHING)
    subject = models.CharField(max_length=32)
    title = models.CharField(max_length=32)
    content = models.TextField(default=None, null=True)
    instructor_rating = models.FloatField(default=None, validators=[rating_validator])
    course_rating = models.FloatField(default=None, validators=[rating_validator])
    department_rating = models.FloatField(default=None, validators=[rating_validator])
    numb_reports = models.IntegerField(default=0)
    date_created = models.DateField(auto_now=True)
    # department_name = models.CharField(default=None, max_length=30)
    # instructor_name = models.CharField(default=None, max_length=30)
    # code = models.CharField(max_length=20, default=None)
    department_name = models.ForeignKey(Department, null=True, on_delete = models.DO_NOTHING)
    instructor_name = models.ForeignKey(Instructor, null=True,on_delete = models.DO_NOTHING)
    code = models.ForeignKey(Course, null=True, on_delete = models.DO_NOTHING)

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

