from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.donorprofiles.models import DonorProfile
from apps.offeredtests.serializers import BoughtTestsOnProfileSerializer


class DonorProfileSerializer(serializers.ModelSerializer):
    country = CountryField()
    bought_tests = BoughtTestsOnProfileSerializer(required=False, many=True)

    class Meta:
        model = DonorProfile
        fields = ['phone', 'first_name', 'last_name', 'country', 'zip', 'city', 'street', 'avatar', 'birthday',
                  'last_donation', 'total_points', 'blood_group', 'gender', 'age', 'bought_tests']
