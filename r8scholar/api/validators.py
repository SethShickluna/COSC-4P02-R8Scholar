#Django#
from django.core.exceptions import ValidationError 
#Python
import string
#Profanity filter 
from profanity_filter import ProfanityFilter
pf = ProfanityFilter()

#Ensures email given is a brocku email
def validate_brock_mail(string): 
    if "@brocku.ca" in string: 
        return string 
    else: 
        raise ValidationError("Must use brock email address.") 

#Ensures string does not contain profanity
def profanity_validator(string):
    #Check nickname for profanity
    if pf.is_profane(string):
        raise ValidationError("Profanity detected in input.")
    else:
        return string

#Ensures password conforms to minimum requirments for a secure password
min_pass_len = 12 #Minimum password length
special_characters = string.punctuation #List of characters considered special characters
def password_validator(string):
    rules = [lambda string: any(i.isupper() for i in string), #String must have at least one uppercase character
        lambda string: any(i.islower() for i in string),  #String must have at least one lowercase character
        lambda string: any(i.isdigit() for i in string),  #String must have at least one digit
        lambda string: any(i in special_characters for i in string), #String must have at least one special character
        lambda string: len(string) >= min_pass_len] #String must be at least 10 characters long
    if all (rule(string) for rule in rules):
        return string 
    else: 
        raise ValidationError("Password must be at least "+str(min_pass_len)+" characters long, and contain at least a single digit, uppercase character, and lowercase character.")
#Ensures ratings for reviews are within the expected range
def rating_validator(string):
    if string >= 0.0 and string <= 5.0:
        return string
    else:
        raise ValidationError("Rating must be between 0.0 and 5.0.")