from backend.r8scholar.models import CustomUser
from django import forms

class ReviewCreationForm(forms.Form):
    subject = forms.charField()
    content = forms.CharField()
    rating = forms.IntegerField(max_value=5,min_value=1)

f = ReviewCreationForm()
print(f)


