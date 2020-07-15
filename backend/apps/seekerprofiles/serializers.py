from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.seekerprofiles.models import SeekerProfile


class SeekerProfileSerializer(serializers.ModelSerializer):
    country = CountryField(country_dict=True)

    class Meta:
        model = SeekerProfile
        fields = ['name', 'phone', 'certificate', 'is_valid', 'website', 'street', 'city', 'zip', 'country', 'phone',
                  'logo', 'code']
