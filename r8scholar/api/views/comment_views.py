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

#Adds or removes a thumbs up/down to a comment
class ThumbsUpDown(APIView):
    def post(self,request,format=None):
        #Data from frontend
        data = json.loads(request.body.decode("utf-8"))
        comment_id = data['comment_id']
        up_or_down = data['up_or_down']
        add_or_remove = data['add_or_remove']
        try:
            comment = Comment.objects.get(comment_id=comment_id)
        except Comment.DoesNotExist:
            return Response({'Bad Request': 'comment doesnt exist...'}, status=status.HTTP_400_BAD_REQUEST)
        if(up_or_down=='up'):
            if(add_or_remove=='add'):
                comment.thumbs_up +=1
                comment.save()
                return Response({'OK':'comment updated with thumbs'+up_or_down}, status=status.HTTP_200_OK)
            elif(add_or_remove=='remove'):
                comment.thumbs_up -=1 if comment.thumbs_up > 0 else 0
                comment.save()
                return Response({'OK':'comment updated with thumbs'+up_or_down}, status=status.HTTP_200_OK)
        elif(up_or_down=='down'):
            if(add_or_remove=='add'):
                comment.thumbs_down +=1
                comment.save()
                return Response({'OK':'comment updated with thumbs'+up_or_down}, status=status.HTTP_200_OK)
            elif(add_or_remove=='remove'):
                comment.thumbs_down -=1 if comment.thumbs_up > 0 else 0
                comment.save()
                return Response({'OK':'comment updated with thumbs'+up_or_down}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'up_or_down data invalid'}, status=status.HTTP_400_BAD_REQUEST)

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
        #Delete the comment with the matching comment_id
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