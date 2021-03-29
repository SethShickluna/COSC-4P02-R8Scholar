# python3 manage.py shell
# exec(open("./api/remove_unverified.py").read())

#Python
from datetime import date
import time
#Project Files
from api.models import CustomUser
#Schedule Module
import schedule

#Deletes unverified user accounts that were not created today
def delete_unverfied_users():
    CustomUser.objects.filter(is_verified = False).exclude(date_created = date.today()).delete()
    #CustomUser.objects.filter(is_verified = False).delete()
    print("Removed Unverified")

schedule.every(3).minutes.do(delete_unverfied_users)
schedule.every().day.at("12:00").do(delete_unverfied_users)

while True:
    schedule.run_pending()
    time.sleep(1)