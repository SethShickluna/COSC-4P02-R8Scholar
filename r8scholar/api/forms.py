from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
from django.core.exceptions import ValidationError

class CustomUserCreationForm(UserCreationForm):
    def confirmBrockEmail(self,CustomUser):
        if not CustomUser.username.endswith("@brocku.ca"):
            raise ValidationError(
                ("Account emails must be @brocku.ca"),
                code='non_brock_email',
            )
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('nickname')

class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('nickname')