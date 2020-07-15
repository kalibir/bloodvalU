from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models
from django_countries.fields import CountryField

# Create your models here.
from apps.registrations.models import code_generator

User = get_user_model()


class SeekerProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='seeker_profile')

    certificate = models.FileField(null=True, blank=True, validators=[FileExtensionValidator(['pdf'])])

    is_valid = models.BooleanField(default=False)

    name = models.CharField(max_length=100, default="name")

    website = models.CharField(max_length=150, blank=True, null=True)

    phone = models.CharField(max_length=50, blank=True)

    country = CountryField(blank=True)

    zip_code = models.CharField(max_length=100, blank=True)

    street = models.CharField(max_length=100, blank=True)

    logo = models.ImageField(blank=True)

    code = models.CharField(
        max_length=5,
        null=False,
        default=code_generator,
    )

    def __str__(self):
        return f'User ID: {self.user.id} Seeker Profile'
