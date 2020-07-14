from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class SeekerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='seeker_profile')

    def __str__(self):
        return f'User ID: {self.user.id} Seeker Profile'
