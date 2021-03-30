#Django
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import CustomUser
from .password_reset import email_password 
#Python
import json
import random
import string
#Profanity Filter
from profanity_filter import ProfanityFilter
pf = ProfanityFilter()

#Allows user to reset their password if they forget it
class password_reset(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist as e:
            return Response({'Bad Request': 'Invalid email...'+str(e.errors)}, status=status.HTTP_400_BAD_REQUEST)
        required_chars = string.ascii_letters + string.digits + string.punctuation
        temp_password = ''.join(random.choice(required_chars) for i in range(12))
        user.set_password(temp_password)
        email_password(user.email,temp_password)
        return Response({'Ok': 'Password reset and email sent to user...'}, status=status.HTTP_200_OK)

#Allows user to change their nickname
class change_nickname(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        password = data['password']
        nickname = data['nickname']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist as e:
            return Response({'Bad Request': 'Invalid email...'+str(e.errors)}, status=status.HTTP_400_BAD_REQUEST)

        if user.check_password(password):
            #Check new nickname for profanity
            if(pf.is_clean(nickname)):
                user.nickname = nickname
                user.save()
                return Response({'Ok': 'nickname changed to: '+str(nickname)}, status=status.HTTP_200_OK)
            else:
                return Response({'Bad Request':'Profanity detected in nickname.'},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'Bad Request': 'Invalid password...'}, status=status.HTTP_400_BAD_REQUEST)

#Allows user to change their password
class change_password(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        old_password = data['old_password']
        new_password = data['new_password']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist as e:
            return Response({'Bad Request': f'Invalid email...{e}'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.check_password(old_password):
            try:
                validate_password(new_password)
            except ValidationError as e:
                return Response({'Bad Request': f'New password must be at least ...{e}'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response({'Ok': 'Password Changed...'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid password...'}, status=status.HTTP_400_BAD_REQUEST)

#Allows user to delete their profile
class delete_profile(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        password = data['password']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist as e:
            return Response({'Bad Request': f'Invalid email...{e}'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.check_password(password):
            user.delete()
            return Response({'Ok': 'Profile deleted...'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid password...'}, status=status.HTTP_400_BAD_REQUEST)