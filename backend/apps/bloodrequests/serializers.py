from rest_framework import serializers

from apps.bloodrequests.models import BloodRequest
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.registrations.models import get_or_none
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class BloodRequestSerializer(serializers.ModelSerializer):
    selected_donor = DonorProfileSerializer(required=False)
    applicants = DonorProfileSerializer(many=True, required=False)
    blood_seeker = SeekerProfileSerializer(required=False)

    class Meta:
        model = BloodRequest
        fields = ['blood_seeker', 'selected_donor', 'status', 'blood_group', 'is_for_covid', 'is_urgent',
                  'is_renewable', 'created', 'applicants', 'points_value',
                  ]

    def validate(self, data):
        if self.context.get('request').user.is_donor:
            raise serializers.ValidationError({"detail": "Only Seekers can make requests!"})
        if not self.context.get('request').user.seeker_profile.is_valid:
            raise serializers.ValidationError(
                {"detail": "Only validated Seekers can make requests, please wait for validation!"})
        return data
