from django.test import TestCase
from api.managers import CustomUserManager
from api.models import CustomUser

class ManagersTestCase(TestCase):

    def test_create_user(self):
        Cuser = CustomUser.objects.create_user("somemail@brocku.ca","nickname23","Asecurepassword##234")
        self.assertEqual(Cuser.nickname, 'nickname23')
        self.assertEqual(Cuser.email,'somemail@brocku.ca')
        self.assertFalse(Cuser.is_admin)

    def test_create_superuser(self):
        Cuser = CustomUser.objects.create_superuser("someothermail@brocku.ca","nickname2345","Asecurepassword##2345")
        self.assertEqual(Cuser.nickname, 'nickname2345')
        self.assertEqual(Cuser.email,'someothermail@brocku.ca')
        self.assertTrue(Cuser.is_admin)
