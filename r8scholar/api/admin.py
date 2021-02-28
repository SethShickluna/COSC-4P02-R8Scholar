from django.contrib import admin
from .models import Comment, Course, CustomUser, Department, Forum, Instructor, Review, Ticket


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'review_id')

class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'courses_rating', 'instructors_rating', 'overall_rating', 'review')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'department', 'rating', 'reviews', 'instructor')

class InstructorAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'rating', 'reviews')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment_id', 'review_id', 'name', 'content', 'child', 'date', 'numb_reports')

class ForumAdmin(admin.ModelAdmin):
    list_display = ('nickname_id', 'title', 'comment')

class TicketAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'date')


admin.site.register(CustomUser, UserAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Department,DepartmentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Instructor, InstructorAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Forum, ForumAdmin)
admin.site.register(Ticket, TicketAdmin)

