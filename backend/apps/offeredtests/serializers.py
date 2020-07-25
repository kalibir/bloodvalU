import os

from django.conf import settings
from django.conf.urls.static import static
from rest_framework import serializers

from apps.offeredtests.models import OfferedTest
from apps.seekerprofiles.serializers import SeekerProfileSerializer
from apps.testresults.models import TestResult


class TestResultPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ['results']


class OfferedTestSerializer(serializers.ModelSerializer):
    seeker = SeekerProfileSerializer(required=False)

    is_bought = serializers.SerializerMethodField()
    seeker_name = serializers.SerializerMethodField()
    results_available = serializers.SerializerMethodField()
    results = serializers.SerializerMethodField()

    def get_results(self, obj):
        request = self.context.get('request')
        if self.context.get('request').user.is_donor:
            donor_profile_results = self.context.get('request').user.donor_profile.test_results.all()
            offered_tests_results = obj.test_results.all()
            if bool(set(donor_profile_results) & set(offered_tests_results)):
                target_result = TestResult.objects.filter(offered_test=obj,
                                                          donor=self.context.get('request').user.donor_profile)
                target_pdf = target_result[0].results
                return request.scheme + "://" + request.get_host() + target_pdf.url
            else:
                return None
        else:
            return None

    def get_results_available(self, obj):
        if self.context.get('request').user.is_donor:
            donor_profile_results = self.context.get('request').user.donor_profile.test_results.all()
            offered_tests_results = obj.test_results.all()
            return bool(set(donor_profile_results) & set(offered_tests_results))
        else:
            return None

    def get_seeker_name(self, obj):
        return obj.seeker.name

    def get_is_bought(self, obj):
        if self.context.get('request').user.is_donor:
            return self.context.get('request').user.donor_profile in obj.donors_who_bought.all()
        else:
            return False

    class Meta:
        model = OfferedTest
        fields = ['id', 'test_type', 'results_available', 'seeker_name', 'test_results', 'results', 'points_cost', 'expiry_date',
                  'created', 'is_bought', 'is_expired',
                  'seeker',
                  'donors_who_bought']


class BoughtTestsOnProfileSerializer(serializers.ModelSerializer):
    seeker = SeekerProfileSerializer(required=False)

    is_bought = serializers.SerializerMethodField()
    seeker_name = serializers.SerializerMethodField()

    def get_seeker_name(self, obj):
        return obj.seeker.name

    def get_is_bought(self, obj):
        if self.context.get('request').user.is_donor:
            return self.context.get('request').user.donor_profile in obj.donors_who_bought.all()
        else:
            return False

    class Meta:
        model = OfferedTest
        fields = ['id', 'test_type', 'seeker_name', 'points_cost', 'expiry_date', 'created', 'is_bought', 'is_expired',
                  'seeker',
                  'donors_who_bought']
