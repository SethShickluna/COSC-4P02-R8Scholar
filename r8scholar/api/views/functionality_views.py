#REST
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#Project Files
from ..models import CustomUser
from ..serializers import VerificationSerializer

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