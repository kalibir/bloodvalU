from django.contrib import admin

# Register your models here.
from apps.testresults.models import TestResult

admin.site.register(TestResult)