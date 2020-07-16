from datetime import date

from django.db import models

# Create your models here.
from apps.donorprofiles.models import DonorProfile
from apps.registrations.models import code_generator
from apps.seekerprofiles.models import SeekerProfile


class OfferedTest(models.Model):
    test_type = models.CharField(max_length=150)

    points_cost = models.IntegerField()

    seekers = models.ManyToManyField(to=SeekerProfile, related_name='offered_tests', blank=True)

    secret_code = models.CharField(
        max_length=5,
        null=False,
        default=code_generator,
    )

    donors = models.ManyToManyField(to=DonorProfile, related_name='bought_tests', blank=True)

    expiry_date = models.DateField(auto_now=False)

    @property
    def is_expired(self):
        return date.today() < self.expiry_date





