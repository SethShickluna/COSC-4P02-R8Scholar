#Project Files
from ..models import Course, Department, Instructor
from ..serializers import (CourseSerializer, DepartmentSerializer, InstructorSerializer)
#REST
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
#Python
import json

#Returns a list of courses filtered by either name(alphabetical), rating(highest to lowest), or rating(lowest to highest)
# amount will specifiy how many courses should be in the returned list
# filter_by will specify which filter to use one the course list
# sample data:
# {"filter_by":"rating_high_low"}
class filterCourseListBy(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        filter_by = data["filter_by"]

        courses = Course.objects.all() #consider all entries
        course_list = []
        #Filter by name
        if (str(filter_by)=="rating_high_low"): #sort by rating 
            #Get list of courses sorted by rating
            for course in courses.order_by('-rating'): #negative rating for high to low 
                course_list.append(CourseSerializer(course).data)
        elif (str(filter_by)=="diff_rating_high_low"): #sort by diff_rating 
            #Get list of courses sorted by diff_rating
            for course in courses.order_by('-diff_rating'): #negative diff_rating for high to low 
                course_list.append(CourseSerializer(course).data)
        #Get list of courses sorted by department
        elif(str(filter_by)=="department"):
            for course in courses.order_by('department'):
                course_list.append(CourseSerializer(course).data)
        else: #default alphabetical 
            for course in courses.order_by('name'):
                course_list.append(CourseSerializer(course).data)

        return Response(course_list, status=status.HTTP_200_OK) 
#Returns a list of instructors filtered by either name(alphabetical), rating(highest to lowest), or rating(lowest to highest)
# amount will specifiy how many instructors should be in the returned list
# filter_by will specify which filter to use one the instructor list
class filterInstructorListBy(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        filter_by = data["filter_by"]

        instructors = Instructor.objects.all() #consider all entries
        instructor_list = []
        #Filter by name
        if (str(filter_by)=="rating_high_low"): #sort by rating 
            #Get list of courses sorted by rating
            for instructor in instructors.order_by('-rating'): #negative rating for high to low 
                instructor_list.append(InstructorSerializer(instructor).data)
        elif(str(filter_by)=="diff_rating_high_low"): #sort by diff_rating 
            #Get list of courses sorted by diff_rating
            for instructor in instructors.order_by('-diff_rating'): #negative diff_rating for high to low 
                instructor_list.append(InstructorSerializer(instructor).data)
        #Get list of instructors sorted by department
        elif(str(filter_by)=="department"):
            for instructor in instructors.order_by('department'): #negative rating for high to low 
                instructor_list.append(InstructorSerializer(instructor).data)
        else: #default alphabetical 
            for instructor in instructors.order_by('name'): #negative rating for high to low 
                instructor_list.append(InstructorSerializer(instructor).data)
        
        return Response(instructor_list, status=status.HTTP_200_OK) 
            

#Returns a list of departments filtered by either name(alphabetical), rating(highest to lowest), or rating(lowest to highest)
# amount will specifiy how many departments should be in the returned list
# filter_by will specify which filter to use one the department list
class filterDepartmentListBy(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        filter_by = data["filter_by"]

        departments = Department.objects.all() #consider all entries
        department_list = []
        #Filter by name
        if (str(filter_by)=="rating_high_low"): #sort by rating 
            #Get list of courses sorted by rating
            for course in departments.order_by('-rating'): #negative rating for high to low 
                department_list.append(DepartmentSerializer(course).data)
        elif(str(filter_by)=="diff_rating_high_low"): #sort by diff_rating 
            #Get list of courses sorted by diff_rating
            for course in departments.order_by('-diff_rating'): #negative diff_rating for high to low 
                department_list.append(DepartmentSerializer(course).data)
        else: #default alphabetical 
            for course in departments.order_by('name'):
                department_list.append(DepartmentSerializer(course).data)
        
        return Response(department_list, status=status.HTTP_200_OK) 


class GetCoursesPerDepartment(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        dept_name = data["department"]
        print(dept_name)
        department = Department.objects.get(name=dept_name)
        if department:
            courses = Course.objects.filter(department=department) 
            course_list = []
            for course in courses: #serialize each entry and return 
                course_list.append(CourseSerializer(course).data)
            return Response(course_list, status=status.HTTP_200_OK) 
        return Response({"Invalid Department Name": "No departments found"}, status=status.HTTP_400_BAD_REQUEST) 
        