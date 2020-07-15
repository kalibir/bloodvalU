from django.db import models

# Create your models here.
from apps.donorprofiles.models import DonorProfile
from apps.seekerprofiles.models import SeekerProfile


class OfferedTest(models.Model):
    test_type = models.CharField(max_length=150)

    points_cost = models.IntegerField()

    seekers = models.ManyToManyField(to=SeekerProfile, related_name='offered_tests', blank=True)

    donors = models.ManyToManyField(to=DonorProfile, related_name='bought_tests', blank=True)





