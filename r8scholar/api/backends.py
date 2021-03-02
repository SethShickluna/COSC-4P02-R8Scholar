from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from api.models import CustomUser

class SettingsBackend(BaseBackend):

    def authenticate(self, request, username, password):
        try:
            user = CustomUser.objects.get(email=username)
            if user.check_password(password):
                return user
            else:
                return None
        except CustomUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return CustomUser.objects.get(email=user_id)
        except CustomUser.DoesNotExist:
            return None