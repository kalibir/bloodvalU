from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.bloodrequests.models import BloodRequest
from apps.bloodrequests.permissions import IsDonorOrReadOnly
from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer


class ListAllDonorsView(ListAPIView):
    """
    List all donors.
    """
    serializer_class = DonorProfileSerializer
    queryset = DonorProfile.objects.filter(user__is_donor=True)
    permission_classes = (IsAuthenticatedOrReadOnly,)


class RetrieveDonorView(RetrieveAPIView):
    """
    Retrieve logged in donor's profile.
    """
    serializer_class = DonorProfileSerializer
    queryset = DonorProfile.objects.all()
    lookup_url_kwarg = 'donor_id'
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ListDonorsAppliedToRequestsView(ListAPIView):
    """
    List all applied to blood requests.
    """
    serializer_class = BloodRequestSerializer

    permission_classes = [IsDonorOrReadOnly]

    def get_queryset(self):
        return self.request.user.donor_profile.applied_to_requests.all().order_by('-created')