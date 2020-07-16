from datetime import date

from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models

# Create your models here.
User = get_user_model()


class DonorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='donor_profile')

    phone = models.CharField(max_length=50, blank=True)

    first_name = models.CharField(max_length=100, blank=True)

    last_name = models.CharField(max_length=100, blank=True)

    country = models.CharField(max_length=50, blank=True)

    zip_code = models.CharField(max_length=100, blank=True)

    street = models.CharField(max_length=100, blank=True)

    avatar = models.ImageField(blank=True)

    birthday = models.DateField(auto_now=False, null=True, blank=True)

    last_donation = models.DateTimeField(auto_now=False, null=True, blank=True)

    total_points = models.IntegerField(blank=True, default=0)

    BLOOD_GROUP_CHOICES = [
        ('O', 'O'),
        ('O+', 'O+'),
        ('A-', 'A-'),
        ('A+', 'A+'),
        ('B-', 'B-'),
        ('B+', 'B+'),
        ('AB-', 'AB-'),
        ('AB+', 'AB+'),
    ]

    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, default='O-')

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('0', 'other'),
    ]

    gender = models.CharField(max_length=2, choices=GENDER_CHOICES, default='M')

    @property
    def age(self):
        today = date.today()
        return today.year - self.birthday.year - ((today.month, today.day) < (self.birthday.month, self.birthday.day))

    def __str__(self):
        return f'Donor ID: {self.id} Donor Profile'
