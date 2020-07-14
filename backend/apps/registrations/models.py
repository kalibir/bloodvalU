import random
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
from django.utils import timezone

User = get_user_model()


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None


def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class Registration(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        related_name="user_registration",
        blank=True,
        null=True,
    )
    email = models.EmailField(
        unique=True,
        null=False,
        default='example@email.com'
    )
    code = models.CharField(
        max_length=5,
        null=False,
        default=code_generator,
    )
    code_type = models.CharField(
        max_length=3,
        choices=(
            ('RVC', 'Registration Validation Code'),
            ('PRC', 'Password Reset Code'),

        )
    )
    code_expiration = models.DateTimeField(
        default=timezone.now() + timedelta(days=2)
    )
    created = models.DateTimeField(
        auto_now=True
    )


def __str__(self):
    return f'Registration ID {self.pk}: {self.email}'
