from django.utils.datetime_safe import date
from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.seekerprofiles.models import SeekerProfile


def bloodGroupTest(bloodgroup, request):
    if bloodgroup == "O-":
        return True
    if bloodgroup == "O+" and request.blood_group in ["O+", "A+", "B+", "AB+"]:
        return True
    if bloodgroup == "A-" and request.blood_group in ["A-", "A+", "AB-", "AB+"]:
        return True
    if bloodgroup == "A+" and request.blood_group in ["A+", "AB+"]:
        return True
    if bloodgroup == "B-" and request.blood_group in ["B-", "B+", "AB-", "AB+"]:
        return True
    if bloodgroup == "B+" and request.blood_group in ["B+", "AB+"]:
        return True
    if bloodgroup == "AB-" and request.blood_group in ["AB-", "AB+"]:
        return True
    if bloodgroup == "AB+" and request.blood_group == "AB+":
        return True
    return False


class SeekerProfileSerializer(serializers.ModelSerializer):
    is_donor = serializers.SerializerMethodField()
    no_of_requests = serializers.SerializerMethodField()
    no_of_completed = serializers.SerializerMethodField()
    no_of_closed = serializers.SerializerMethodField()
    no_of_open = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    is_staff = serializers.SerializerMethodField()

    def get_is_staff(self, obj):
        return obj.user.is_staff

    def get_is_donor(self, obj):
        return obj.user.is_donor

    def get_email(self, obj):
        return obj.user.email

    def get_no_of_requests(self, obj):
        if self.context.get('request').user.is_staff:
            return obj.made_requests.count()
        elif self.context.get('request').user.is_donor:
            count = 0
            donor_blood_group = self.context.get('request').user.donor_profile.blood_group
            for request_obj in obj.made_requests.all():
                if bloodGroupTest(donor_blood_group, request_obj) and (
                        (request_obj.valid_until > date.today() and request_obj.status == "OP") or (
                        request_obj.selected_donor == self.context.get(
                    'request').user.donor_profile and request_obj.status == "CL")):
                    count += 1
            return count
        else:
            return obj.made_requests.count()

    def get_no_of_completed(self, obj):
        return obj.made_requests.filter(status="COM").count()

    def get_no_of_closed(self, obj):
        return obj.made_requests.filter(status="CL").count()

    def get_no_of_open(self, obj):
        return obj.made_requests.filter(status="OP").count()

    class Meta:
        model = SeekerProfile
        fields = ['id', 'name', 'phone', 'is_donor', 'is_staff', 'email', 'certificate', 'longitude', 'latitude',
                  'no_of_requests', 'is_valid', 'website',
                  'street',
                  'zip_code',
                  'country',
                  'no_of_completed',
                  'no_of_closed',
                  'no_of_open',
                  'phone',
                  'created',
                  'logo']
