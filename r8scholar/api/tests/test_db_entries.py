from django.test import TestCase
from api.models import Instructor, Course, Department
from api.db_entries import ModelGenerator

class db_entriesTestCase(TestCase):
    def test_Department_db_entries(self):
        ModelGenerator('./api/data/departments.txt', "Department")
        self.assertTrue(True)
        ModelGenerator('./api/data/instructors.txt', "Instructor")
        self.assertTrue(True)
        ModelGenerator('./api/data/courses.txt', "Course")
        self.assertTrue(True)
