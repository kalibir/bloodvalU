from rest_framework import serializers

from apps.donorprofiles.models import DonorProfile
from apps.offeredtests.models import OfferedTest
from apps.offeredtests.serializers import BoughtTestsOnProfileSerializer
from apps.testresults.models import TestResult


class DonorProfileSerializer(serializers.ModelSerializer):
    no_of_bought_tests = serializers.SerializerMethodField()
    is_donor = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    no_of_applications = serializers.SerializerMethodField()
    no_of_test_results = serializers.SerializerMethodField()
    is_staff = serializers.SerializerMethodField()

    def get_is_staff(self, obj):
        return obj.user.is_staff

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
        fields = ['id', 'phone', 'is_donor', 'is_staff', 'email', 'can_donate', 'can_donate', 'first_name', 'last_name',
                  'country',
                  'unique_donor_id',
                  'zip_code', 'street', 'no_of_bought_tests',
                  'avatar', 'birthday', 'has_been_selected', 'test_results',
                  'next_donation', 'total_points', 'blood_group', 'gender', 'age',
                  'no_of_applications', 'no_of_test_results', 'created']


class GetBuyersOfOfferedTestSerializer(DonorProfileSerializer):
    pdf_result = serializers.SerializerMethodField()

    def get_pdf_result(self, obj):
        request = self.context.get('request')
        if not request.user.is_donor:
            target_offered_test = OfferedTest.objects.get(id=int(request.data.get('test_id')))
            tests_results = target_offered_test.test_results.all()
            profile_results = obj.test_results.all()
            if bool(set(profile_results) & set(tests_results)):
                target_result = TestResult.objects.filter(offered_test=target_offered_test,
                                                          donor=obj)
                target_pdf = target_result[0].results
                return request.scheme + "://" + request.get_host() + target_pdf.url
            else:
                return None
        else:
            return None

    class Meta:
        model = DonorProfile
        fields = ['id', 'phone', 'is_donor', 'is_staff', 'email', 'can_donate', 'can_donate', 'first_name', 'last_name',
                  'country',
                  'unique_donor_id',
                  'zip_code', 'street', 'no_of_bought_tests',
                  'avatar', 'birthday', 'has_been_selected', 'test_results', 'pdf_result',
                  'next_donation', 'total_points', 'blood_group', 'created', 'gender', 'age',
                  'no_of_applications', 'no_of_test_results']
