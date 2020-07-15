from django.contrib import admin

# Register your models here.
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
# from apps.donorprofiles.models import DonorProfile
# from apps.seekerprofiles.models import SeekerProfile
# from django.db.models.signals import post_save
# from django.dispatch import receiver

User = get_user_model()


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_donor'),
        }),
    )
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'is_donor')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    readonly_fields = ('date_joined', 'last_login')
    list_display = ('pk', 'username', 'email', 'is_staff')
    ordering = ('-email',)