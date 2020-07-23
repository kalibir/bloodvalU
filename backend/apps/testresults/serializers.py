from rest_framework import serializers

from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.offeredtests.models import OfferedTest
from apps.registrations.models import get_or_none
from apps.testresults.models import TestResult


class TestResultSerializer(serializers.ModelSerializer):
    donor = DonorProfileSerializer(required=False, read_only=True)

    class Meta:
        model = TestResult
        fields = ['id', 'donor', 'offered_test', 'result_code', 'results']

    def validate(self, data):
        request = self.context.get('request')
        if self.context.get('request').user.is_donor:
            raise serializers.ValidationError({"detail": "Only Seekers can upload results!"})
        if not self.context.get('request').user.seeker_profile.is_valid:
            raise serializers.ValidationError(
                {"detail": "Only validated Seekers can make upload results, please wait for validation!"})
        if not get_or_none(DonorProfile, id=request.data.get('donor')):
            raise serializers.ValidationError({"detail": "This donor does not exist!"})
        if not get_or_none(OfferedTest, id=request.data.get('test_id')):
            raise serializers.ValidationError({"detail": "This offered test does not exist!"})
        if not DonorProfile.objects.get(id=request.data.get('donor')) in OfferedTest.objects.get(
                id=request.data.get('test_id')).donors_who_bought.all():
            raise serializers.ValidationError({"detail": "The selected Donor never bought this test!"})
        duplicate = TestResult.objects.filter(donor=request.data.get('donor'),
                                              offered_test=request.data.get('test_id')).exists()
        if duplicate:
            raise serializers.ValidationError(
                'This result already exists, please update instead of creating a new result for this particular test')
        return data



