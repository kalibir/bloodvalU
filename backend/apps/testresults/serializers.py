from rest_framework import serializers

from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.registrations.models import get_or_none
from apps.testresults.models import TestResult


class TestResultSerializer(serializers.ModelSerializer):
    donor = DonorProfileSerializer(required=False)

    class Meta:
        model = TestResult
        fields = ['id', 'donor', 'type_of_test', 'result_code', 'results']

    def validate(self, data):
        if self.context.get('request').user.is_donor:
            raise serializers.ValidationError({"detail": "Only Seekers can upload results!"})
        if not self.context.get('request').user.seeker_profile.is_valid:
            raise serializers.ValidationError(
                {"detail": "Only validated Seekers can make upload results, please wait for validation!"})
        if not get_or_none(DonorProfile, id=data.get('donor_id')):
            raise serializers.ValidationError({"detail": "This donor does not exist!"})
        if not get_or_none(DonorProfile, id=data.get('test_id')):
            raise serializers.ValidationError({"detail": "This offered test does not exist!"})

        return data
