#REST
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import CustomUser, Review, Course, Department, Instructor
from ..serializers import (DeleteReviewSerializer, ReportReviewSerializer, ReviewSerializer, EditReviewSerializer)
from .email_report import email_r8scholar

#Notifies admins of a review being reported
class ReportReview(APIView):
    serializer_class = ReportReviewSerializer
    def post(self,request, format =None):
        serializer = self.serializer_class(data=request.data)
        #Make sure data conforms to the constraints of the database models
        if serializer.is_valid():
            #Data from frontend
            review_id = serializer.data['review_id']
            report_description = serializer.data['report_description']
            #Get data on review that was reported
            review = Review.objects.get(review_id=review_id)
            #Get data on user who created the review
            user = review.reviewer
            #Increment report counter
            review.numb_reports += 1
            email_r8scholar(review_id,report_description,review.numb_reports,user.email,user.nickname,review.subject,review.title,review.content)

#Deletes an existing review
class DeleteReviewView(APIView):
    serializer_class = DeleteReviewSerializer
    def post(self,request, format =None):
        serializer = self.serializer_class(data=request.data)
        #Make sure data conforms to the constraints of the database models
        if serializer.is_valid():
            #Data from frontend
            review_id = serializer.data['review_id']
            #Delete the review with the matching review_id
            Review.objects.get(review_id=review_id).delete()

#Edits an existing review of a course/instructor/department
class EditReviewView(APIView):
    serializer_class = EditReviewSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        #Make sure data conforms to the constraints of the database models
        if serializer.is_valid():
            #Data from frontend
            review_id = serializer.data['review_id']
            subject = serializer.data['subject']
            title = serializer.data['title']
            content = serializer.data['content']
            rating = serializer.data['rating']
            review_type = serializer.data['review_type']
            #get data for the type of reviewable being reviewed
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
            #Find existing review and edit it
            review = Review.objects.get(review_id=review_id)
            review.title = title
            review.content = content
            review.rating = rating
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