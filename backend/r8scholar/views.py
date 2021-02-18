from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpRequest

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import ReviewSerializer, UserSerializer, CommentSerializer, \
    CourseSerializer, DeparmentSerializer, InstructorSerializer, ForumSerializer, TicketSerializer      # add this
from .models import CustomUser, Review, Comment, Course, Department, Instructor, Forum, Ticket

class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class CourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

class DepartmentView(viewsets.ModelViewSet):
    serializer_class = DeparmentSerializer
    queryset = Department.objects.all()

class InstructorView(viewsets.ModelViewSet):
    serializer_class = InstructorSerializer
    queryset = Instructor.objects.all()

class ForumView(viewsets.ModelViewSet):
    serializer_class = ForumSerializer
    queryset = Forum.objects.all()

class TicketView(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
