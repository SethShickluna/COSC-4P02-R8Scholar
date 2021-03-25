#Project Files
from ..models import Course, Department, Instructor
from ..serializers import ( CourseSerializer, DepartmentSerializer,InstructorSerializer)
#REST
from rest_framework import filters, generics
#Multiple Models Module
from drf_multiple_model.views import ObjectMultipleModelAPIView

#search view
class SearchView(ObjectMultipleModelAPIView):

    querylist = (
        {'queryset': Course.objects.all(), 'serializer_class': CourseSerializer},
        {'queryset': Instructor.objects.all(), 'serializer_class': InstructorSerializer},
        {'queryset': Department.objects.all(), 'serializer_class': DepartmentSerializer},
        
    )
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name','course_full_name']

class SearchInstructorView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class SearchCourseView(generics.ListCreateAPIView):
    search_fields = ['name','course_full_name']
    filter_backends = (filters.SearchFilter,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class SearchDeptView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer