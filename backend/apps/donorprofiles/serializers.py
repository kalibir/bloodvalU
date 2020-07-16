from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.donorprofiles.models import DonorProfile
from apps.offeredtests.serializers import BoughtTestsOnProfileSerializer


class DonorProfileSerializer(serializers.ModelSerializer):
    bought_tests = BoughtTestsOnProfileSerializer(required=False, many=True)

    is_donor = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    def get_is_donor(self, obj):
        return obj.user.is_donor

    def get_email(self, obj):
        return obj.user.email

    class Meta:
        model = DonorProfile
        fields = ['id', 'phone', 'is_donor', 'email', 'first_name', 'last_name', 'country', 'zip_code', 'street',
                  'avatar', 'birthday',
                  'last_donation', 'total_points', 'blood_group', 'gender', 'age', 'bought_tests',
                  'applied_to_requests', 'accepted_requests', 'test_results']
