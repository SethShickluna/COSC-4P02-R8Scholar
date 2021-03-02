from django.contrib import admin
from django import forms
from .models import Comment, Course, CustomUser, Department, Forum, Instructor, Review, Ticket
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

# Register your models here.

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('email', 'nickname')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'nickname', 'is_active', 'is_admin')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]

class UserAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ('email', 'nickname', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('nickname',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nickname', 'password1', 'password2'),
        }),
    )
    search_fields = ('email','nickname')
    ordering = ('email',)
    filter_horizontal = ()

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('nickname', 'review_id', 'department_name', 'instructor_name', 'code','instructor_rating','course_rating' )

class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('department_name', 'courses_rating', 'instructors_rating', 'overall_rating')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'course_name', 'department_name', 'course_rating', 'instructor_name')

class InstructorAdmin(admin.ModelAdmin):
    list_display = ('instructor_name', 'department_name', 'instructor_rating')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment_id', 'review_id', 'name', 'content', 'child', 'date', 'numb_reports')

class ForumAdmin(admin.ModelAdmin):
    list_display = ('nickname_id', 'title', 'comment')

class TicketAdmin(admin.ModelAdmin):
    list_display = ('email', 'content', 'date')


admin.site.register(CustomUser, UserAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Department,DepartmentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Instructor, InstructorAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Forum, ForumAdmin)
admin.site.register(Ticket, TicketAdmin)

