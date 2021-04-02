#REST
from rest_framework import generics
#Project Files
from ..models import CustomUser, Review, Comment, Course, Department, Instructor, Ticket
from ..serializers import (UserSerializer, ReviewSerializer, CommentSerializer, CourseSerializer, DepartmentSerializer, 
InstructorSerializer, TicketSerializer)

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
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

class InstructorView(generics.ListAPIView):
    serializer_class = InstructorSerializer
    queryset = Instructor.objects.all()

class TicketView(generics.ListAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
