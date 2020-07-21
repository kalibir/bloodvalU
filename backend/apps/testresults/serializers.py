from rest_framework import serializers

from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.testresults.models import TestResult


class TestResultSerializer(serializers.ModelSerializer):
    donor = DonorProfileSerializer(required=False)

    class Meta:
        model = TestResult
        fields = ['donor', 'type_of_test', 'result_code', 'results']
