from django.test import TestCase
from api.generators import generate_validation_code

class generatorsTestCase(TestCase):

    def test_generate_validation_code(self):
        self.assertEqual(len(generate_validation_code(6)),6)
        self.assertEqual(len(generate_validation_code(8)),8)
        self.assertEqual(len(generate_validation_code()),6)
