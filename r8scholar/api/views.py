#Django#
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.password_validation import *
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.urls import reverse_lazy
#REST#
from rest_framework import generics, status, filters,viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
#Project files# 
from .serializers import (UserSerializer, ReviewSerializer, CommentSerializer, CourseSerializer, DeparmentSerializer, 
InstructorSerializer, ForumSerializer, TicketSerializer, CreateUserSerializer, CreateReviewSerializer, 
loginLogoutSerializer, VerificationSerializer, SearchSerializer)
from .email_sender import email_user

from itertools import chain
from drf_multiple_model.views import ObjectMultipleModelAPIView

from .models import CustomUser, Review, Comment, Course, Department, Instructor, Forum, Ticket

import json 

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

#search view
class SearchView(ObjectMultipleModelAPIView):
    querylist = (
        {'queryset': Course.objects.all(), 'serializer_class': CourseSerializer},
        {'queryset': Instructor.objects.all(), 'serializer_class': InstructorSerializer},
        {'queryset': Department.objects.all(), 'serializer_class': DeparmentSerializer},
        
    )
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    

class SearchInstructorView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class SearchCourseView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class SearchDeptView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Department.objects.all()
    serializer_class = DeparmentSerializer

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
            else:
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
            else:
                return Response({'Review(s) Not Found': 'Invalid Review Subject.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'No Subject to Query'}, status=status.HTTP_400_BAD_REQUEST)

class GetCourseView(APIView): 
    serializer_class = CourseSerializer
    lookup_url_kwarg = 'name'

    def get(self, request, format=None):
        name = request.GET.get(self.lookup_url_kwarg)
        if name != None:
            course = Course.objects.filter(name=name)
            if len(course) > 0:
                data = self.serializer_class(course[0]).data
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'Course Not Found': 'Invalid Course Name.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'No Subject to Query'}, status=status.HTTP_400_BAD_REQUEST)

class GetDepartmentView(APIView): 
    serializer_class = DeparmentSerializer
    lookup_url_kwarg = 'name'

    def get(self, request, format=None):
        name = request.GET.get(self.lookup_url_kwarg)
        if name != None:
            department = Department.objects.filter(name=name)
            if len(department) > 0:
                data = self.serializer_class(department[0]).data
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'Department Not Found': 'Invalid department name.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'No Subject to Query'}, status=status.HTTP_400_BAD_REQUEST)

class GetInstructorView(APIView): 
    serializer_class = InstructorSerializer
    lookup_url_kwarg = 'name'

    def get(self, request, format=None):
        name = request.GET.get(self.lookup_url_kwarg)
        if name != None:
            instructor = Instructor.objects.filter(name=name)
            if len(instructor) > 0:
                data = self.serializer_class(instructor[0]).data
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'Instructor Not Found': 'Invalid instructor name.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'No Subject to Query'}, status=status.HTTP_400_BAD_REQUEST)

class getTopCourses(APIView): #im only going to comment this one because instructors is the exact same 
    
    def post(self,request):
        data = json.loads(request.body.decode("utf-8")) #info is given by a post request
        department = data['department']#since we need both a departmant and an amount 
        amt = int(data['amount'])
        my_department = None
        if department != 'any':
            my_department = Department.objects.get(name=department) #find the department

        if my_department is not None or department=="any":#if not goto else and return that we dont have that department 
            top_courses = [None]*amt
            courses = None#find the courses the belong to the department 
            if department=="any":
                courses = Course.objects.all()
            else:
                courses = Course.objects.filter(department=my_department)#find the courses the belong to the department 

            if len(courses) >= amt: #cannot request more courses than we have 
                #Get list of instructors sorted by rating
                courses_sorted_rating = Course.objects.order_by('-rating')
                for i in range(amt):
                    top_courses[i] = courses_sorted_rating[i]
                #serialize the final choices 
                for c in range(amt): #cannot do this before because we need to compared the ratings constantly 
                    top_courses[c] = CourseSerializer(top_courses[c]).data
                return Response(top_courses, status=status.HTTP_200_OK) 
            else:
                return Response({"Invalid Request":"Too many courses requested"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"Invalid Request":"Courses not found"}, status=status.HTTP_404_NOT_FOUND)

class getTopInstructors(APIView):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        department = data['department']
        amt = int(data['amount'])
        my_department = None
        if department != 'any':
            my_department = Department.objects.get(name=department) #find the department
        
        if my_department is not None or department=="any":
            top_instructors = [None]*amt
            instructors = None
            if department == "any":
                instructors = Instructor.objects.all()
            else:
                instructors = Instructor.objects.filter(department=my_department)
            if len(instructors) >= amt:
                #Get list of instructors sorted by rating
                instructors_sorted_rating = Instructor.objects.order_by('-rating')
                for i in range(amt):
                    top_instructors[i] = instructors_sorted_rating[i]
                #serialize the final choices 
                for i in range(amt):
                    top_instructors[i] = InstructorSerializer(top_instructors[i]).data
                return Response(top_instructors, status=status.HTTP_200_OK)
            else:
                return Response({"Invalid Request":"Too many instructors requested"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"Invalid Request":"Courses not found"}, status=status.HTTP_404_NOT_FOUND)

class getTopDepartments(APIView):
    serializer_class = DeparmentSerializer
    lookup_url_kwarg = 'amount'

    def get(self, request, format=None):
        amt = int(request.GET.get(self.lookup_url_kwarg))
        top_departments=[None]*amt
        departments = Department.objects.all()
        if len(departments) >= amt:
            departments_sorted_rating = Department.objects.order_by('-rating')
            for i in range(amt):
                top_departments[i] = departments_sorted_rating[i]
            #serialize final list
            for i in range(amt):
                top_departments[i] = self.serializer_class(top_departments[i]).data
            return Response(top_departments, status=status.HTTP_200_OK)
        else:
            return Response({"Invalid Request":"Too many departments requested"}, status=status.HTTP_400_BAD_REQUEST)
            
#Returns a list of courses filtered by either name(alphabetical), rating(highest to lowest), or rating(lowest to highest)
# amount will specifiy how many courses should be in the returned list
# filter_by will specify which filter to use one the course list
# sample data:
# {"filter_by":"rating_high_low","amount":"10"}
class filterCourseListBy(APIView):

    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        filter_by = data["filter_by"]

        courses = None
        #Filter by name
        if (str(filter_by)=="name"):
            courses = Course.objects.all()
            amount = courses.count()
            course_list = [None]*amount
            #Get list of courses sorted by rating
            courses_sorted_name = Instructor.objects.order_by('name')
            for course in courses_sorted_name:
                course_list.append(course)
            #Serialize final list
            for c in range(amount):
                course_list[c] = CourseSerializer(course_list[c]).data
            return Response(course_list, status=status.HTTP_200_OK) 
        #Filter by rating from highest to lowest
        if (str(filter_by)=="rating_high_low"):
            courses = Course.objects.all()
            amount = courses.count()
            course_list = [None]*amount
            #Get list of courses sorted by rating
            courses_sorted_rating = Instructor.objects.order_by('rating')
            for course in courses_sorted_rating:
                course_list.append(course)
            #serialize the final choices 
            for c in range(amount): #cannot do this before because we need to compared the ratings constantly 
                course_list[c] = CourseSerializer(course_list[c]).data
            return Response(course_list, status=status.HTTP_200_OK) 
#Returns a list of instructors filtered by either name(alphabetical), rating(highest to lowest), or rating(lowest to highest)
# amount will specifiy how many instructors should be in the returned list
# filter_by will specify which filter to use one the instructor list
class filterInstructorListBy(APIView):

    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        filter_by = data['filter_by']
        
        instructors = None
        #Filter by name
        if (str(filter_by)=='name'):
            instructors = Instructor.objects.all()
            amount = instructors.count()
            instructor_list = [None]*amount
            #Get list of instructors sorted by name
            instructors_sorted_name = Instructor.objects.order_by('name')
            for instructor in instructors_sorted_name:
                instructor_list.append(instructor)
            #Serialize final list
            for c in range(amount):
                instructor_list[c] = InstructorSerializer(instructor_list[c]).data
            return Response(instructor_list, status=status.HTTP_200_OK) 
            
        #Filter by rating from highest to lowest
        if (str(filter_by)=='rating_high_low'):
            instructors = Instructor.objects.all()
            amount = instructors.count()
            instructor_list = [None]*amount
            #Get list of instructors sorted by rating
            instructors_sorted_rating = Instructor.objects.order_by('rating')
            for instructor in instructors_sorted_rating:
                instructor_list.append(instructor)
            for c in range(amount): #cannot do this before because we need to compared the ratings constantly 
                instructor_list[c] = InstructorSerializer(instructor_list[c]).data
            return Response(instructor_list, status=status.HTTP_200_OK) 
            

#Returns a list of departments filtered by either name(alphabetical), rating(highest to lowest), or rating(lowest to highest)
# amount will specifiy how many departments should be in the returned list
# filter_by will specify which filter to use one the department list
class filterDepartmentListBy(APIView):

    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        filter_by = data['filter_by']

        departments = None
        #Filter by name
        if (str(filter_by)=='name'):
            departments = Department.objects.all()
            amount = departments.count()
            department_list = [None]*amount
            #Get list of departments sorted by name
            departments_sorted_name = Department.objects.order_by('name')
            for department in departments_sorted_name:
                department_list.append(department)
            #serialize the final list
            for c in range(amount):
                department_list[c] = DeparmentSerializer(department_list[c]).data
            return Response(department_list, status=status.HTTP_200_OK) 
            
        #Filter by rating from highest to lowest
        if (str(filter_by)=='rating_high_low'):
            departments = Department.objects.all()
            amount = departments.count()
            department_list = [None]*amount
            #Get list of departments sorted by rating
            departments_sorted_rating = Department.objects.order_by('rating')
            for department in departments_sorted_rating:
                department_list.append(department)
            #serialize the final list 
            for c in range(amount):
                department_list[c] = DeparmentSerializer(department_list[c]).data
            return Response(department_list, status=status.HTTP_200_OK) 


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
            user = CustomUser.objects.create_user(email=email, nickname=nickname, password=password)
            user.nickname = nickname
            #user.is_verified =True
            user.save()
            #Uses email sending script called email_sender.py
            #email_user(user.email,user.verification_code)
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
            user.nickname = nickname
            user.save()
            return Response({'Ok': 'nickname changed to: '+str(nickname)}, status=status.HTTP_200_OK)
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
            return Response({'Bad Request': 'Invalid email...'+str(e.errors)}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.check_password(old_password):
            try:
                validate_password(new_password)
            except ValidationError as e:
                return Response({'Bad Request': 'New password must be at least ...'+e.message}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response({'Ok': 'Password Changed...'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid password...'}, status=status.HTTP_400_BAD_REQUEST)


class CreateReviewView(APIView):
    serializer_class = CreateReviewSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            nickname = serializer.data['nickname']
            subject = serializer.data['subject']
            title = serializer.data['title']
            content = serializer.data['content']
            rating = serializer.data['rating']
            review_type = serializer.data['review_type']
            #get user who left review and other objects 
            user = CustomUser.objects.get(nickname=nickname)
            my_department = None
            my_instructor = None
            my_course = None
            if review_type == 'course':
                my_course = Course.objects.get(name=subject)
                my_department = my_course.department
            elif review_type == 'instructor':
                my_instructor = Instructor.objects.get(name=subject)
                my_department = my_instructor.department
            else: #review is on a department
                my_department = Department.objects.get(name=subject)
            
            review = Review(reviewer=user, nickname=nickname, subject=subject, 
            title=title, content=content, rating=rating, department_name=my_department,
            instructor_name=my_instructor, course_name=my_course, review_type=review_type)
            review.save()
            #update rating of the review subject 
            if review_type == 'course':
                my_course.update_rating()
                my_department.update_course_rating()
            elif review_type == 'instructor':
                my_instructor.update_rating()
                my_department.update_instructor_rating()
            else: #review is on a department
                my_department.update_rating()

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
            print(local_code, " | ", verification_code)
            if local_code == verification_code: 
                #yay
                user.is_verified = True
                user.save(update_fields=['is_verified'])
                return Response({"Verification Code Accepted" : "Account has been Verified"}, status=status.HTTP_202_ACCEPTED)
            #nay 
            return Response({"Incorrect Verification Code" : "Account not has been Verified"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"User Not Found" : "Could not Vertify"}, status=status.HTTP_400_BAD_REQUEST)



        
