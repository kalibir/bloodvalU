from datetime import date

from django.db import models

# Create your models here.
from apps.donorprofiles.models import DonorProfile
from apps.seekerprofiles.models import SeekerProfile


class BloodRequest(models.Model):
    seeker = models.ForeignKey(to=SeekerProfile, on_delete=models.CASCADE, related_name='made_requests')

    selected_donor = models.ForeignKey(to=DonorProfile, on_delete=models.CASCADE,
                                       related_name="accepted_requests",
                                       blank=True, null=True)

    STATUS_CHOICES = [
        ('OP', 'Open'),
        ('CL', 'Closed'),
        ('COM', 'Completed'),
    ]

    status = models.CharField(max_length=4, choices=STATUS_CHOICES, default='OP')

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

    blood_group = models.CharField(max_length=4, choices=BLOOD_GROUP_CHOICES)

    is_for_covid = models.BooleanField()

    is_urgent = models.BooleanField()

    is_renewable = models.BooleanField()

    created = models.DateTimeField(auto_now_add=True)

    valid_until = models.DateField(auto_now=False)

    applicants = models.ManyToManyField(to=DonorProfile, related_name='applied_to_requests', blank=True)

    @property
    def is_valid(self):
        return date.today() < self.valid_until

    @property
    def points_value(self):
        if self.is_urgent:
            return '18000'
        else:
            return '12000'



