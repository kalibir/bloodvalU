from rest_framework import serializers
from rest_framework.generics import ListAPIView

from apps.bloodrequests.models import BloodRequest
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class BloodRequestSerializer(serializers.ModelSerializer):
    selected_donor = DonorProfileSerializer(required=False, read_only=True)
    seeker = SeekerProfileSerializer(required=False)
    no_of_applicants = serializers.SerializerMethodField()
    logged_in_donor_is_selected = serializers.SerializerMethodField()

    def get_no_of_applicants(self, obj):
        return obj.applicants.count()

    def get_logged_in_donor_is_selected(self, obj):
        return self.context.get('request').user.donor_profile == obj.selected_donor

    class Meta:
        model = BloodRequest
        fields = ['id', 'status', 'blood_group', 'until', 'is_for_covid', 'is_urgent', 'logged_in_donor_is_selected',
                  'is_renewable', 'created', 'points_value', 'no_of_applicants', 'selected_donor', 'seeker'
                  ]

    def validate(self, data):
        if self.context.get('request').user.is_donor:
            raise serializers.ValidationError({"detail": "Only Seekers can make requests!"})
        if not self.context.get('request').user.seeker_profile.is_valid:
            raise serializers.ValidationError(
                {"detail": "Only validated Seekers can make requests, please wait for validation!"})
        return data
