#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import CustomUser, Review, Course, Department, Instructor, Tags
from ..serializers import (ReviewSerializer)
from .email_report import email_r8scholar
#Python
import json
#Profanity Filter
from profanity_filter import ProfanityFilter
pf = ProfanityFilter()

#Adds or removes a thumbs up/down to a review
class ThumbsUpDown(APIView):
    def post(self,request,format=None):
        #Data from frontend
        data = json.loads(request.body.decode("utf-8"))
        review_id = data['review_id']
        email = data['email']
        up_or_down = data['up_or_down']
        try:
            review = Review.objects.get(review_id=review_id)
        except Review.DoesNotExist:
            return Response({'Bad Request': 'Review doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'Bad Request': 'User doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        if(up_or_down=='up'):
            #Check if user already thumbs upped this review
            if(review.users_thumbs_upped.filter(email=email)):
                review.thumbs_up -= 1
                review.users_thumbs_upped.remove(user)
                review.save()
                return Response({'OK':'thumbs '+up_or_down+' removed'}, status=status.HTTP_200_OK)
            #Check if user has already thumbs downed this review
            elif(review.users_thumbs_downed.filter(email=email)):
                review.users_thumbs_downed.remove(user)
                review.thumbs_down -=1 if review.thumbs_down > 0 else 0
                review.thumbs_up +=1
                review.users_thumbs_upped.add(user)
                review.save()
                return Response({'OK':'Review updated with thumbs '+up_or_down}, status=status.HTTP_200_OK)
            #User has not rated this review before
            else:
                review.thumbs_up +=1
                review.users_thumbs_upped.add(user)
                review.save()
                return Response({'OK':'Review updated with thumbs '+up_or_down}, status=status.HTTP_200_OK)
        elif(up_or_down=='down'):
            #Check if user has already thumbs downed this review
            if(review.users_thumbs_downed.filter(email=email)):
                review.thumbs_down -=1
                review.users_thumbs_downed.remove(user)
                review.save()
                return Response({'OK':'thumbs '+up_or_down+' removed'}, status=status.HTTP_200_OK)
            elif(review.users_thumbs_upped.filter(email=email)):
                review.users_thumbs_upped.remove(user)
                review.thumbs_up -=1 if review.thumbs_up > 0 else 0
                review.thumbs_down +=1
                review.users_thumbs_downed.add(user)
                review.save()
                return Response({'OK':'Review updated with thumbs '+up_or_down}, status=status.HTTP_200_OK)
            #User has not rated this review before
            else:
                review.thumbs_down +=1
                review.users_thumbs_downed.add(user)
                review.save()
                return Response({'OK':'Review updated with thumbs '+up_or_down}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'up_or_down data invalid'}, status=status.HTTP_400_BAD_REQUEST)


#Notifies admins of a review being reported
class ReportReview(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        review_id = data['review_id']
        report_description = data['report_description']
        email = data['email']
        try:
            #Get data on review that was reported
            review = Review.objects.get(review_id=review_id)
        except Review.DoesNotExist:
            return Response({'Bad Request': 'Review doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        #Get data on user who reported review
        try:
            user_reported = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'Bad Request': 'User doesnt exist with email: '+email}, status=status.HTTP_400_BAD_REQUEST)
        #Ensure the same user can't report a review multiple times
        if(user_reported in review.users_reported.all()):
            return Response({'Bad Request': f'User : {email} has already reported this review'}, status=status.HTTP_400_BAD_REQUEST)
        #Get data on user who created the review
        user = review.reviewer
        #Increment report counter
        review.numb_reports += 1
        #Store user who reported review
        review.users_reported.add(user_reported)
        review.save()
        email_r8scholar(review_id,report_description,review.numb_reports,user.email,user.nickname,review.subject,review.title,review.content,review.date_created)
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
            return Response({'OK':'Review Deleted'}, status=status.HTTP_200_OK)
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
        diff_rating = data['diff_rating']
        would_take_again = data['would_take_again']
        tag_1 = data['tag_1']
        tag_2 = data['tag_2']
        tag_3 = data['tag_3']
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
        review.diff_rating = diff_rating
        review.would_take_again = would_take_again
        review.tag_1 = tag_1
        review.tag_2 = tag_2
        review.tag_3 = tag_3
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
        return Response(ReviewSerializer(review).data, status=status.HTTP_200_OK)