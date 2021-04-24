from django.test import TestCase
from api.validators import validate_brock_mail
from api.validators import profanity_validator
from api.validators import rating_validator
from django.core.exceptions import ValidationError


class validatorsTestCase(TestCase):

    def test_validate_brock_mail(self):
        mail="lb16tp@brocku.ca"
        fakemail="somemail@notgood.ca"
        self.assertEqual(validate_brock_mail(mail), 'lb16tp@brocku.ca')
        with self.assertRaises(ValidationError):
          validate_brock_mail(fakemail)

    def   test_profanity_validator(self):
        goodword="good"
        badword="nasty"
        self.assertEqual(profanity_validator(goodword), "good")
        with self.assertRaises(ValidationError):
          profanity_validator(badword)
    def password_validator(self):
        strongpassword="This#isAstrongpassword!132"
        weakpassword="thisisnt"
        weakpassword2="neitheristhispassword"
        weakpassword3="Neitheristhispassword2"
        self.assertEqual(password_validator(strongpassword),"This#isAstrongpassword!132")
        self.assertNotEqual(password_validator(weakpassword),"thisisnt")
        self.assertNotEqual(password_validator(weakpassword1),"neitheristhispassword")
        self.assertNotEqual(password_validator(weakpassword2),"Neitheristhispassword2")
    def rating_validator(self):
        rating=3.5
        rating2=5.5
        self.assertEqual(rating_validator(rating),3.5)
        self.assertNotEqual(rating_validator(rating2),5.5)
