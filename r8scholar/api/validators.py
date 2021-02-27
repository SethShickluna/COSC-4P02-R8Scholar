#Django#
from django.core.exceptions import ValidationError 

#Email validators
def validate_brock_mail(value): 
    if "@brocku.ca" in value: 
        return value 
    else: 
        raise ValidationError("Must use brock email address.") 

#Password validators
min_pass_len = 10 #Minimum password length
#Ensures password has at least one number
def password_validator(value):
    rules = [lambda value: any(i.isupper() for i in value), #Must have at least one uppercase character
        lambda value: any(i.islower() for i in value),  #Must have at least one lowercase character
        lambda value: any(i.isdigit() for i in value),  #Must have at least one digit
        lambda value: len(value) >= min_pass_len] #Must be at least 10 characters long
    if all (rule(value) for rule in rules):
        return value 
    else: 
        raise ValidationError("Password must be at least "+str(min_pass_len)+" characters long, and contain at least a single digit, uppercase character, and lowercase character.")

def rating_validator(value):
    if value >= 0.0 and value <= 5.0:
        return value
    else:
        raise ValidationError("Rating must be between 0.0 and 5.0.")


