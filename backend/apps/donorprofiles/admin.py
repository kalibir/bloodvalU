from django.contrib import admin

# Register your models here.
from apps.donorprofiles.models import DonorProfile

admin.site.register(DonorProfile)
