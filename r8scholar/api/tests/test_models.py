
from django.test import TestCase
from api.models import CustomUser
from api.models import Department
from api.models import Instructor
from api.models import Course
from api.models import Review

class ModelsTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(email="lb16tp@brocku.ca",nickname="logan",password="password")
        CustomUser.objects.create(email="llbbtt2@brocku.ca",nickname="logan2",password="password",is_admin=True)
        Department.objects.create(name="departmenttest",courses_rating=3.555,instructors_rating=2.444,rating=3.00)
        Dept=Department.objects.get(name="departmenttest")
        Cuser=CustomUser.objects.get(email="lb16tp@brocku.ca")
        Instructor.objects.create(name="instructortest",department=Dept,rating=3.44,)
        Inst=Instructor.objects.get(name="instructortest")
        Course.objects.create(name="coursetest",department=Dept,rating=4.22,course_full_name="fullnametest")
        Cor=Course.objects.get(name="coursetest")
        Review.objects.create(reviewer=Cuser,nickname="testnick",subject="tester",title="test",rating=2.5,department_name=Dept,instructor_name=Inst,course_name=Cor)
    def test_str_(self):
        CUser=CustomUser.objects.get(email="lb16tp@brocku.ca")
        self.assertEqual(CUser._str_(), 'lb16tp@brocku.ca')

    def test_email_user(self):
        CUser=CustomUser.objects.get(email="lb16tp@brocku.ca")

    def test_has_perm(self):
        CUser=CustomUser.objects.get(email="lb16tp@brocku.ca")
        self.assertTrue(CUser.has_perm(CUser.is_active))

    def test_has_module_perms(self):
        CUser=CustomUser.objects.get(email="lb16tp@brocku.ca")
        self.assertTrue(CUser.has_module_perms(CUser.is_active))

    def test_is_staff(self):
        CUser=CustomUser.objects.get(email="lb16tp@brocku.ca")
        CUser2=CustomUser.objects.get(email="llbbtt2@brocku.ca")
        self.assertFalse(CUser.is_staff)
        self.assertTrue(CUser2.is_staff)
    def test_dept_update_rating(self):
        Dept=Department.objects.get(name="departmenttest")
        Dept.update_rating()
        self.assertEqual(Dept.rating,2.5)

    def test_update_instructor_rating(self):
        Dept=Department.objects.get(name="departmenttest")
        Dept.update_instructor_rating()
        self.assertEqual(Dept.instructors_rating,2.5)

    def test_update_course_rating(self):
        Dept=Department.objects.get(name="departmenttest")
        Dept.update_course_rating()
        self.assertEqual(Dept.courses_rating,2.5)

    def test_course_update_rating(self):
        Cor=Course.objects.get(name="coursetest")
        Cor.update_rating()
        self.assertEqual(Cor.rating,2.5)

    def test_instructor_update_rating(self):
        Inst=Instructor.objects.get(name="instructortest")
        Inst.update_rating()
        self.assertEqual(Inst.rating,2.5)
