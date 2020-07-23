from django.contrib import admin

# Register your models here.
from apps.donordata.models import DonorData

admin.site.register(DonorData)
