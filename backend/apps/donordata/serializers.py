from rest_framework import serializers

from apps.donordata.models import DonorData


class DonorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonorData
        fields = ['id',
                  'seeker',
                  'blood_request',
                  'zip_code',
                  'birthday',
                  'selected_donor',
                  'country',
                  'blood_group',
                  'street',
                  'gender',
                  'created',
                  'age'
                  ]
