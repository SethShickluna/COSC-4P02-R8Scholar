#python file to populate the database with each department, professor, course, etc
#from models import Instructor, Course, Department

class CourseGenerator:
    
    def __init__(self, data):
        super().__init__()
        self.data_type = data 
        print(self.data_type)
        self.get_data()

    def generate(self, data):
        pass 
    
    def get_data(self): 
        f = open('r8scholar/api/data/courses.txt')

        while True: 
            course = f.readline().split(',')
            course[len(course) - 1] = course[len(course) -1].replace('\n', '')
            print(course)
            if len(course) <= 1: break
           
        
        f.close()

class DeptGenerator:
    
    def __init__(self, data):
        super().__init__()
        self.data_type = data 
        print(self.data_type)

    def generate(self):
        pass 
    
    def get_data(self): 
        pass

class InstructorGenerator:
    
    def __init__(self, data):
        super().__init__()
        self.data_type = data 
        print(self.data_type)

    def generate(self):
        pass 
    
    def get_data(self): 
        pass




if __name__ == "__main__": 
    my_instructors = InstructorGenerator("Instructor")
    my_courses = CourseGenerator("Course")
    my_departments = DeptGenerator("Department")

