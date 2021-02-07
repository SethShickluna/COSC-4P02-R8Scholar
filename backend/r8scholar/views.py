from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import ReviewSerializer, UserSerializer, CommentSerializer, CourseSerializer      # add this
from .models import CustomUser, Review, Comment, Course

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
