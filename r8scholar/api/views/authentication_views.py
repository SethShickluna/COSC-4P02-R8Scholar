#Django
from django.urls import reverse_lazy
from django.contrib.auth import authenticate, login, logout
#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Python
import json

#logs user in
class login(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        password = data['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request= request, user=user)
            return Response({'Ok': 'user logged in...'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid username or password...'}, status=status.HTTP_400_BAD_REQUEST)

#logs user out
class logout(APIView):
    def post(self,request):
        logout(request=request)
        redirect = reverse_lazy('users')
        data = {'redirect-url':redirect}
        return Response(data, status=status.HTTP_200_OK)