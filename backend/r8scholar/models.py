from django.conf import settings
from django.db import models
from django.utils import timezone

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length = 254)
    username = models.CharField(max_length=20)

    def _str_(self):
        return self.email

class Review(models.Model):
    review_id = models.IntegerField(primary_key=True)
    reviewer = models.ForeignKey(User, on_delete = models.CASCADE)

    def _str_(self):
        return self.reviewer





