from django.db import models
from datetime import date


# Create your models here.
from apps.bloodrequests.models import BloodRequest


class DonorData(models.Model):
    blood_request = models.ForeignKey(to=BloodRequest, on_delete=models.CASCADE, related_name="statistics")

    zip_code = models.CharField(max_length=100, blank=True)

    birthday = models.DateField(auto_now=False, null=True, blank=True)

    BLOOD_GROUP_CHOICES = [
        ('O-', 'O-'),
        ('O+', 'O+'),
        ('A-', 'A-'),
        ('A+', 'A+'),
        ('B-', 'B-'),
        ('B+', 'B+'),
        ('AB-', 'AB-'),
        ('AB+', 'AB+'),
    ]

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'other'),
    ]

    selected_donor = models.BooleanField(default=False)

    country = models.CharField(max_length=50, blank=True)

    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, default='O-')

    street = models.CharField(max_length=100, blank=True)

    gender = models.CharField(max_length=2, choices=GENDER_CHOICES, default='M')

    @property
    def age(self):
        today = date.today()
        return today.year - self.birthday.year - ((today.month, today.day) < (self.birthday.month, self.birthday.day))

    def __str__(self):
        return f'Data ID: {self.id} Donor Data'
