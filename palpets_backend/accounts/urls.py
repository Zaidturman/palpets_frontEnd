from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    """
    تخصيص واجهة المشرف لنموذج المستخدم
    """
    list_display = [
        'username', 'email', 'first_name', 'last_name',
        'user_type', 'is_verified', 'is_active'
    ]
    list_filter = ['user_type', 'is_verified', 'is_active', 'city']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    fieldsets = UserAdmin.fieldsets + (
        ('معلومات إضافية', {
            'fields': (
                'user_type', 'phone_number', 'gender',
                'birth_date', 'city', 'address',
                'profile_image', 'is_verified'
            )
        }),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('معلومات إضافية', {
            'fields': (
                'user_type', 'phone_number', 'gender',
                'birth_date', 'city', 'address'
            )
        }),
    )

admin.site.register(User, CustomUserAdmin)