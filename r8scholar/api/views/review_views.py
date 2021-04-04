#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import CustomUser, Review, Course, Department, Instructor
from ..serializers import (ReviewSerializer)
from .email_report import email_r8scholar
#Python
import json
#Profanity Filter
from profanity_filter import ProfanityFilter
pf = ProfanityFilter()

#Notifies admins of a review being reported
class ReportReview(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        print(data)
        #Data from frontend
        review_id = data['review_id']
        report_description = data['report_description']
        try:
            #Get data on review that was reported
            review = Review.objects.get(review_id=review_id)
        except Review.DoesNotExist:
            return Response({'Bad Request': 'Review doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        #Get data on user who created the review
        user = review.reviewer
        #Increment report counter
        review.numb_reports += 1
        review.save()
        email_r8scholar(review_id,report_description,review.numb_reports,user.email,user.nickname,review.subject,review.title,review.content)
        return Response({'OK':'Report message sent'}, status=status.HTTP_201_CREATED)

#Deletes an existing review
class DeleteReviewView(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        review_id = data['review_id']
        #Delete the review with the matching review_id
        try:
            Review.objects.get(review_id=review_id).delete()
            return Response({'OK':'Review Deleted'}, status=status.HTTP_201_CREATED)
        except Review.DoesNotExist:
            return Response({'Bad Request': 'Review doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)

#Edits an existing review of a course/instructor/department
class EditReviewView(APIView):
    def post(self, request, format=None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        review_id = data['review_id']
        subject = data['subject']
        title = data['title']
        content = data['content']
        rating = data['rating']
        review_type = data['review_type']
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
        try:
            #Get data on review that was reported
            review = Review.objects.get(review_id=review_id)
        except Review.DoesNotExist:
            return Response({'Bad Request': 'Review doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        #Ensure any profanity in title or content is censored
        review.title = pf.censor(title)
        review.content = pf.censor(content)
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

#Upvotes an existing review
class UpvoteReview(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        review_id= data['review_id']
        email=data['email']
        #CHECK IF USER HAS ALREADY VOTED ON REVIEW
        #IF USER HAS NOT VOTED, UPDATE REVIEW VOTES +1
        #IF USER HAS DOWNVOTED, UPDATE REVIEW VOTES BY +2
        #ELSE DO NOTHING
    print("test")

#Downvotes an existing review
class DownvoteReview(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        review_id= data['review_id']
        email=data['email']
        #CHECK IF USER HAS ALREADY VOTED ON REVIEW
        #IF USER HAS NOT VOTED, UPDATE REVIEW VOTES -1
        #IF USER HAS UPVOTED, UPDATE REVIEW VOTES BY -2
        #ELSE DO NOTHING
    print("test")