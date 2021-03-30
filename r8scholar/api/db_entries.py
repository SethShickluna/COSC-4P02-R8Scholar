#python file to populate the database with each department, professor, course, etc
#also  make sure that there are no spaces, the spaces are unwanted characters that mess up the queries 

#-----running this script -----# 
# 1. cd into /r8scholar (directory with manage.py)
# 2. run the command --> python3 manage.py shell (this runs a python shell in our django environment)
# 3. run this command the execute the script exec(open("./api/db_entries.py").read()) 
from api.models import Instructor, Course, Department, Tags


class ModelGenerator:
    
    def __init__(self, filepath, my_type):
        super().__init__()
        self.type = my_type
        print(my_type)
        self.get_data(filepath)
        

    def generate(self, data):
        model = None
        if self.type == "Department": 
            model = Department(name=data[0].strip(), courses_rating=0, instructors_rating=0, rating=0)
        elif self.type == "Instructor":
            my_department = Department.objects.get(name=data[1].strip())
            model = Instructor(name=data[0], department=my_department, rating=0)
        elif self.type == "Course":
            my_department = Department.objects.get(name=data[1].strip())
            model = Course(name=data[0], department=my_department, rating=0, course_full_name=data[2])
        elif self.type == "Tag":
            model = Tags(description=data[0])
        print("Creating", model)
        model.save()
    
    def get_data(self, filepath): 
        f = open(filepath)

        while True: 
            model = f.readline().split('|')
            model[len(model) - 1] = model[len(model) -1].replace('\n', '')
            
            if model[0] == '': break
            self.generate(data=model)
        
        f.close()




if __name__ == "builtins": 
    ModelGenerator('./api/data/departments.txt', "Department") #make departments first cause dependencies
    ModelGenerator('./api/data/instructors.txt', "Instructor") #make instructor next 
    ModelGenerator('./api/data/courses.txt', "Course") #courses need departments and instructors 
    ModelGenerator('./api/data/tags.txt', "Tag")

