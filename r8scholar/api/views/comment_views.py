#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import Comment, CustomUser, Review
from .email_report import email_r8scholar
#Python
import json
#Profanity Filter
from profanity_filter import ProfanityFilter
pf = ProfanityFilter()

#Notifies admins of a comment being reported
class ReportComment(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        comment_id = data['comment_id']
        report_description = data['report_description']
        try:
            #Get data on review that was reported
            comment = Comment.objects.get(comment_id=comment_id)
        except Review.DoesNotExist:
            return Response({'Bad Request': 'Comment doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        #Get data on user who created the review
        user = comment.commenter
        #Increment report counter
        comment.numb_reports += 1
        comment.save()
        email_r8scholar(comment_id,report_description,comment.numb_reports,user.email,user.nickname,comment.content)
        return Response({'OK':'Report message sent'}, status=status.HTTP_201_CREATED)

#User can delete their comments
class DeleteComment(APIView):
    def post(self,request, format =None):
        data = json.loads(request.body.decode("utf-8"))
        #Data from frontend
        comment_id = data['comment_id']
        #Delete the review with the matching review_id
        try:
            Comment.objects.get(comment_id=comment_id).delete()
            return Response({'OK':'Comment Deleted'}, status=status.HTTP_201_CREATED)
        except Comment.DoesNotExist:
            return Response({'Bad Request': 'Comment doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)

#User can edit their comments
class EditComment(APIView):
    def post(self,request,format=None):
        data = json.loads(request.body.decode("utf-8"))
        comment_id = data['comment_id']
        content = data['comment']
        #Get comment
        try:
            comment = Comment.objects.get(comment_id=comment_id)
        except Comment.DoesNotExist:
            return Response({'Bad Request': 'Comment doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        #Edit the comment
        comment.content = pf.censor(content) #Ensure any profanity in content is censored
        comment.save()
        return Response({'OK':'Comment Edited'}, status=status.HTTP_201_CREATED)

