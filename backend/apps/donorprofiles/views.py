from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.utils.datetime_safe import date
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

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


class FilterOrListAllAvailableRequestsForDonor(ListAPIView):
    """
    List all available tests for a Donor or filter them.
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = BloodRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = BloodRequest.objects.filter(
            (Q(valid_until__gt=date.today()) & Q(status="OP")) | Q(selected_donor=self.request.user.donor_profile))
        search_param = self.request.query_params.get('search_param')
        results = queryset.filter(Q(seeker__name__icontains=search_param) | Q(seeker__name__icontains=search_param) | Q(
            seeker__zip_code__icontains=search_param) | Q(seeker__country__icontains=search_param) | Q(
            seeker__website__icontains=search_param) | Q(blood_group__icontains=search_param))
        serializer = self.get_serializer(results, many=True)
        return Response(serializer.data)
