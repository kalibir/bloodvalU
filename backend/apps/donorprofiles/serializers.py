from rest_framework import serializers

from apps.donorprofiles.models import DonorProfile
from apps.offeredtests.serializers import BoughtTestsOnProfileSerializer


class DonorProfileSerializer(serializers.ModelSerializer):
    no_of_bought_tests = serializers.SerializerMethodField()
    is_donor = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    no_of_applications = serializers.SerializerMethodField()
    no_of_test_results = serializers.SerializerMethodField()

    def get_no_of_test_results(self, obj):
        return obj.test_results.count()

    def get_no_of_applications(self, obj):
        return obj.applied_to_requests.count()

    def get_no_of_bought_tests(self, obj):
        return obj.bought_tests.count()

    def get_is_donor(self, obj):
        return obj.user.is_donor

    def get_email(self, obj):
        return obj.user.email

    class Meta:
        model = DonorProfile
        fields = ['id', 'phone', 'is_donor', 'email', 'can_donate', 'can_donate', 'first_name', 'last_name', 'country',
                  'zip_code', 'street', 'no_of_bought_tests',
                  'avatar', 'birthday', 'has_been_selected',
                  'next_donation', 'total_points', 'blood_group', 'gender', 'age',
                  'no_of_applications', 'no_of_test_results']
