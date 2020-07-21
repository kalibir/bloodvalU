from django.contrib import admin

# Register your models here.
from apps.bloodrequests.models import BloodRequest

admin.site.register(BloodRequest)
