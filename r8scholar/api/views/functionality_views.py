#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import CustomUser
from ..serializers import VerificationSerializer
#Python modules
import json 

#verify user 
class VerifyUserView(APIView): 

    def post(self, request, format=None): 
        #post data 
        data = json.loads(request.body.decode("utf-8"))
        email = data['email']
        submitted_code = data['verification_code']
        #legit code from user 
        user = CustomUser.objects.get(email=email)
        if user:
            actual_code = user.verification_code
            if actual_code == submitted_code: 
                user.is_verified = True
                user.save(update_fields=['is_verified'])
                return Response({"Verification Code Accepted" : "Account has been Verified"}, status=status.HTTP_202_ACCEPTED)

            return Response({"Incorrect Verification Code" : "Account not has been Verified"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"User Not Found" : "Could not Vertify"}, status=status.HTTP_404_NOT_FOUND)