from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import ReviewSerializer, UserSerializer      # add this
from .models import User, Review

class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()