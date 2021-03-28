#Python
from datetime import datetime
#Project Files
from .models import CustomUser

#Deletes unverified user accounts that were not created today
def delete_unverfied_users():
    CustomUser.objects.filter(is_verified = False).exclude(date_created = datetime.date.today()).delete()
