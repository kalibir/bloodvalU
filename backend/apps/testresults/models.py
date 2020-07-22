from django.core.validators import FileExtensionValidator
from django.db import models

# Create your models here.
from apps.donorprofiles.models import DonorProfile
from apps.offeredtests.models import OfferedTest
from apps.registrations.models import code_generator


class TestResult(models.Model):

    type_of_test = models.ForeignKey(to=OfferedTest, on_delete=models.CASCADE, related_name='test_results')

    donor = models.ForeignKey(to=DonorProfile, on_delete=models.CASCADE, related_name='test_results')
    result_code = models.CharField(
        max_length=5,
        null=False,
        default=code_generator,
    )

    results = models.FileField(validators=[FileExtensionValidator(['pdf'])])

