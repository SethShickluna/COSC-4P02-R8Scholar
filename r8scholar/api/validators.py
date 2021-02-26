from django.core.exceptions import ValidationError 
#Email validators
def validate_brock_mail(value): 
    if "@brocku.ca" in value: 
        return value 
    else: 
        raise ValidationError("This field accepts mail id of brocku only") 

#Password validators
min_pass_len = 10
#Ensures password has at least one number
def password_validator(value):
    rules = [lambda value: any(i.isupper() for i in value), # must have at least one uppercase character
        lambda value: any(i.islower() for i in value),  # must have at least one lowercase character
        lambda value: any(i.isdigit() for i in value),  # must have at least one digit
        lambda value: len(value) >= min_pass_len] # must be at least 10 characters long
    if all (rule(value) for rule in rules):
        return value 
    else: 
        raise ValidationError("Password must be at least 10 characters long, and contain at least a single digit, uppercase character, and lowercase character.")