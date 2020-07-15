from django.db import models

# Create your models here.
from apps.donorprofiles.models import DonorProfile
from apps.seekerprofiles.models import SeekerProfile


class BloodRequest(models.Model):
    blood_seeker = models.ForeignKey(to=SeekerProfile, on_delete=models.CASCADE, related_name='made_requests')

    selected_donor = models.ForeignKey(to=DonorProfile, on_delete=models.CASCADE,
                                       related_name="accepted_requests",
                                       blank=True)

    STATUS_CHOICES = [
        ('OP', 'Open'),
        ('CL', 'Closed'),
        ('COM', 'Completed'),
    ]

    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='OPEN')

    blood_group = models.CharField(max_length=10, blank=True)

    is_for_covid = models.BooleanField(default=False)

    is_urgent = models.BooleanField(default=False)

    is_renewable = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True)

    applicants = models.ManyToManyField(to=DonorProfile, related_name='applied_to_requests', blank=True)

    @property
    def points_value(self):
        if self.is_urgent:
            return '18000'
        else:
            return '12000'



