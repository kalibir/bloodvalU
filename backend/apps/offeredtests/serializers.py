from rest_framework import serializers

from apps.offeredtests.models import OfferedTest
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class OfferedTestSerializer(serializers.ModelSerializer):
    seekers = SeekerProfileSerializer(many=True, required=False)

    class Meta:
        model = OfferedTest
        fields = ['test_type', 'points_cost', 'seekers', 'donors']


class BoughtTestsOnProfileSerializer(serializers.ModelSerializer):
    seekers = SeekerProfileSerializer(many=True, required=False)

    class Meta:
        model = OfferedTest
        fields = ['test_type', 'points_cost', 'seekers', 'donors']
