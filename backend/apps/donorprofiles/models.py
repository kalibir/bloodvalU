from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class DonorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='donor_profile')

    certificates = models.FileField(upload_to='documents/',
                                    content_types=['application/pdf'])
    is_valid = models.BooleanField(default=False)

    name = models.CharField(max_length=100)

    website = models.CharField(max_length=150, blank=True, null=True)

    phone = models.CharField(max_length=50)


    def __str__(self):
        return f'User ID: {self.user.id} Donor Profile'
