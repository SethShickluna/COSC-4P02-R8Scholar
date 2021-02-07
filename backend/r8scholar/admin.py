from django.contrib import admin
from .models import CustomUser, Review


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username')


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'review_id')



admin.site.register(CustomUser, UserAdmin)
admin.site.register(Review, ReviewAdmin)
