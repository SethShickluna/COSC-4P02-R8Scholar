#Django#
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.password_validation import *
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.urls import reverse_lazy, reverse
from django.views.generic.edit import FormView
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import messages
#Python
import json
#REST#
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project files# 
from .serializers import (UserSerializer, ReviewSerializer, CommentSerializer, CourseSerializer, DeparmentSerializer, 
InstructorSerializer, ForumSerializer, TicketSerializer, CreateUserSerializer, CreateReviewSerializer, 
loginLogoutSerializer, VerificationSerializer)
from .models import CustomUser, Review, Comment, Course, Department, Instructor, Forum, Ticket
from .validators import password_validator

#instance list views 
class ReviewView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class UserView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class CommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class CourseView(generics.ListAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

class DepartmentView(generics.ListAPIView):
    serializer_class = DeparmentSerializer
    queryset = Department.objects.all()

class InstructorView(generics.ListAPIView):
    serializer_class = InstructorSerializer
    queryset = Instructor.objects.all()

class ForumView(generics.ListAPIView):
    serializer_class = ForumSerializer
    queryset = Forum.objects.all()

class TicketView(generics.ListAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

#get views 
class GetUser(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'email'

    def get(self, request, format=None):
        email = request.GET.get(self.lookup_url_kwarg)
        if email != None:
            user = CustomUser.objects.filter(email=email)
            if len(user) > 0:
                data = UserSerializer(user[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'User Not Found': 'Invalid User Email.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Email not found in request'}, status=status.HTTP_400_BAD_REQUEST)

#returns all reviews on a specific subject 
class GetReviewsView(APIView): 
    serializer_class = ReviewSerializer
    lookup_url_kwarg = 'subject'

    def get(self, request, format=None):
        subject = request.GET.get(self.lookup_url_kwarg)
        if subject != None:
            reviews = Review.objects.filter(subject=subject)
            if len(reviews) > 0:
                data = []
                for review in reviews: 
                    data.append(ReviewSerializer(review).data)
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'No Subject to Query'}, status=status.HTTP_400_BAD_REQUEST)

#create views 
class CreateUserView(APIView): 
    serializer_class = CreateUserSerializer
    
    def post(self, request, format=None): 
        #checks for or creates an active session with the server -- might not matter 
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            email = serializer.data.get('email')
            nickname = serializer.data.get('nickname')
            password = serializer.data.get('password')
            user = CustomUser.objects.create_user(email=email, nickname=nickname, password=password, reviews=None, comments=None, forum_posts=None)
            user.nickname = nickname
            user.is_active = True
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'Bad Request': 'Serializer invalid...'+str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)

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

#allows user to change their password
class change_password(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        old_password = data['old_password']
        new_password = data['new_password']
        user = CustomUser.objects.get(email=email)

        if user.check_password(old_password):
            try:
                validate_password(new_password)
            except ValidationError as e:
                return Response({'Bad Request': 'New password must be at least ...'+e.message}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response({'Ok': 'Password Changed...'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid email or password...'}, status=status.HTTP_400_BAD_REQUEST)

class CreateReviewView(APIView):
    serializer_class = CreateReviewSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            reviewer = serializer.data.get('reviewer')
            subject = serializer.data.get('subject')
            title = serializer.data.get('title')
            content = serializer.data.get('content')
            rating = serializer.data.get('rating')
            review = Review(reviewer=reviewer, subject=subject, title=title, content=content, rating=rating)
            review.save()
            return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


#verify user 
class VerifyUserView(APIView): 
    serializer_class = VerificationSerializer
    queryset = CustomUser.objects.all()
    lookup_url_kwarg = 'email'
    email = None

    def get(self, request, format=None):
        email = request.GET.get(self.lookup_url_kwarg)
        if email != None:
            return Response({"Got email" : "User found"}, status=status.HTTP_202_ACCEPTED)
        return Response({"Invalid Email":"User not found"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None): 

        serializer = self.serializer_class(data=request.data)
        email = request.GET.get(self.lookup_url_kwarg)
        if serializer.is_valid(raise_exception=True): 
            #inputted code
            verification_code = serializer.data.get('verification_code')
            #code from user 
            user = CustomUser.objects.get(email=email)
            local_code = user.verification_code
            if local_code == verification_code: 
                #yay
                user.is_verified = True
                user.save(update_fields=['is_verified'])
                return Response({"Verification Code Accepted" : "Account has been Verified"}, status=status.HTTP_202_ACCEPTED)
            #nay 
            return Response({"Incorrect Verification Code" : "Account not has been Verified"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"User Not Found" : "Could not Vertify"}, status=status.HTTP_400_BAD_REQUEST)
