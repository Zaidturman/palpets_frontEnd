from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    نموذج المستخدم المخصص للمنصة
    """
    USER_TYPE_CHOICES = (
        ('user', 'مستخدم عادي'),
        ('breeder', 'مربي'),
        ('vet', 'طبيب بيطري'),
        ('shelter', 'ملجأ'),
        ('admin', 'مدير'),
    )
    
    GENDER_CHOICES = (
        ('male', 'ذكر'),
        ('female', 'أنثى'),
    )
    
    user_type = models.CharField(
        max_length=20, 
        choices=USER_TYPE_CHOICES,
        default='user',
        verbose_name="نوع المستخدم"
    )
    
    phone_number = models.CharField(
        max_length=15, 
        blank=True, 
        null=True,
        verbose_name="رقم الهاتف"
    )
    
    gender = models.CharField(
        max_length=10, 
        choices=GENDER_CHOICES, 
        blank=True, 
        null=True,
        verbose_name="الجنس"
    )
    
    birth_date = models.DateField(
        blank=True, 
        null=True,
        verbose_name="تاريخ الميلاد"
    )
    
    city = models.CharField(
        max_length=100, 
        blank=True, 
        null=True,
        verbose_name="المدينة"
    )
    
    address = models.TextField(
        blank=True, 
        null=True,
        verbose_name="العنوان"
    )
    
    profile_image = models.ImageField(
        upload_to='profiles/', 
        blank=True, 
        null=True,
        verbose_name="الصورة الشخصية"
    )
    
    is_verified = models.BooleanField(
        default=False,
        verbose_name="حساب موثق"
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="تاريخ الإنشاء"
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="آخر تحديث"
    )
    
    class Meta:
        verbose_name = "مستخدم"
        verbose_name_plural = "المستخدمين"
    
    def __str__(self):
        return f"{self.username} - {self.get_full_name()}"
    
    def get_full_name(self):
        """إرجاع الاسم الكامل للمستخدم"""
        full_name = f"{self.first_name} {self.last_name}".strip()
        return full_name or self.username
    
    def is_breeder(self):
        return self.user_type == 'breeder'
    
    def is_vet(self):
        return self.user_type == 'vet'
    
    def is_shelter(self):
        return self.user_type == 'shelter'