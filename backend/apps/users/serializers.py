from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.seekerprofiles.serializers import SeekerProfileSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_donor', 'is_staff']
        extra_kwargs = {
            'email': {'read_only': True},
            'is_donor': {'read_only': True},
        }


class DonorUserSerializer(serializers.ModelSerializer):
    donor_profile = DonorProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'is_donor', 'donor_profile', 'is_staff']
        extra_kwargs = {
            'email': {'read_only': True},
            'is_donor': {'read_only': True},
        }


class SeekerUserSerializer(serializers.ModelSerializer):
    seeker_profile = SeekerProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'is_donor', 'seeker_profile']
        extra_kwargs = {
            'email': {'read_only': True},
            'is_donor': {'read_only': True},
        }
