from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.seekerprofiles.models import SeekerProfile


class SeekerProfileSerializer(serializers.ModelSerializer):
    is_donor = serializers.SerializerMethodField()
    no_of_requests = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    is_staff = serializers.SerializerMethodField()

    def get_is_staff(self, obj):
        return obj.user.is_staff

    def get_is_donor(self, obj):
        return obj.user.is_donor

    def get_email(self, obj):
        return obj.user.email

    def get_no_of_requests(self, obj):
        return obj.made_requests.count()

    class Meta:
        model = SeekerProfile
        fields = ['id', 'name', 'phone', 'is_donor', 'is_staff', 'email', 'certificate', 'longitude', 'latitude',
                  'no_of_requests', 'is_valid', 'website',
                  'street',
                  'zip_code',
                  'country',
                  'phone',
                  'logo', 'offered_tests']
