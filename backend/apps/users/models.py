from django.contrib.auth.models import AbstractUser

from django.db import models


# Create your models here.


class User(AbstractUser):
    # Field used for authentication in Django admin
    USERNAME_FIELD = 'email'
    # Extra fields needed when using createsuperuser (by default USERNAME_FIELD and passwords
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True, default='example@email.com')

    is_donor = models.BooleanField(default=True)

    username = models.CharField(unique=False, blank=True, null=True, max_length=50)

    def __str__(self):
        return f'User ID: {self.id} email: {self.email}'

