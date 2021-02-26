#Django imports 
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.password_validation import *
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.urls import reverse_lazy
#REST#
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project files # 
from .serializers import *
from .models import CustomUser, Review, Comment, Course, Department, Instructor, Forum, Ticket

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
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'Bad Request': 'Serializer invalid...'+str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)

#logs user in
class login(APIView):
    serializer_class = loginLogoutSerializer()

    def my_view(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                redirect = reverse_lazy('users',request=request)
                data = {'redirect-url':redirect}
                return Response(data, status=status.HTTP_200_OK)
                # Redirect to a success page.
            else:
                return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
                # Return an 'invalid login' error message.

#logs user out
class logout(APIView):
    def logout_view(self,request):
        logout(request)
        redirect = reverse_lazy('users',request=request)
        data = {'redirect-url':redirect}
        return Response(data, status=status.HTTP_200_OK)
        # Redirect to a success page.


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
