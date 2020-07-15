from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer


class ListAllDonorsView(ListAPIView):
    """
    List all Seekers.
    """
    serializer_class = DonorProfileSerializer
    queryset = DonorProfile.objects.filter(user__is_donor=True)
    permission_classes = (IsAuthenticatedOrReadOnly,)


class RetrieveDonorView(RetrieveAPIView):
    """
    Retrieve one User.
    """
    serializer_class = DonorProfileSerializer
    queryset = DonorProfile.objects.all()
    lookup_url_kwarg = 'donor_id'
    permission_classes = (IsAuthenticatedOrReadOnly,)