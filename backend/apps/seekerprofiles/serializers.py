from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.seekerprofiles.models import SeekerProfile


class SeekerProfileSerializer(serializers.ModelSerializer):
    country = CountryField(country_dict=True)
    is_donor = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    def get_is_donor(self, obj):
        return obj.user.is_donor

    def get_email(self, obj):
        return obj.user.email

    class Meta:
        model = SeekerProfile
        fields = ['id', 'name', 'phone', 'is_donor', 'email', 'certificate', 'is_valid', 'website', 'street',
                  'zip_code',
                  'country',
                  'phone',
                  'logo', 'made_requests', 'offered_tests']
