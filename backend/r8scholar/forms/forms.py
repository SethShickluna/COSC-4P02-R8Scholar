from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from backend.r8scholar.models import CustomUser
from django.core.exceptions import ValidationError

class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('nickname')