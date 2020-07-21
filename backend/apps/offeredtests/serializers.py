from rest_framework import serializers

from apps.offeredtests.models import OfferedTest
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class OfferedTestSerializer(serializers.ModelSerializer):
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
