#things that have to be generated 
import string
import random 

#generate a random 6 character string 
def generate_validation_code(size=6):
    chars = string.digits + string.ascii_uppercase
    code = ''.join(random.choice(chars) for _ in range(size))
    return code 
    
def determine_type(email): 
    print(email)
    return not any(i.isdigit() for i in str(email))


if __name__ == "__main__": 
    print(determine_type("ss16wn@brocku.ca"))
    print(determine_type("bockusd@brocku.ca"))