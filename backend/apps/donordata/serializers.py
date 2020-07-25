from rest_framework import serializers

from apps.donordata.models import DonorData


class DonorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonorData
        exclude = []
