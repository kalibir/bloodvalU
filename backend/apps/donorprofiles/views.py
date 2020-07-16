from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.utils.datetime_safe import date
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from apps.bloodrequests.models import BloodRequest
from apps.bloodrequests.permissions import IsDonorOrReadOnly
from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.offeredtests.models import OfferedTest
from apps.offeredtests.serializers import OfferedTestSerializer


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


class FilterOrListAllAvailableRequestsOrTestsForDonor(ListAPIView):
    """
    List all available offered tests or blood requests for a Donor.
    """
    permission_classes = [IsDonorOrReadOnly]

    def get_serializer_class(self):
        type = self.request.query_params.get('type')
        if type == "tests":
            return OfferedTestSerializer
        elif type == "requests":
            return BloodRequestSerializer

    def list(self, request, *args, **kwargs):
        if self.request.user.is_donor:
            search_param = self.request.query_params.get('search_param')
            type = self.request.query_params.get('type')
            if type == "requests":
                queryset = BloodRequest.objects.filter(
                    (Q(valid_until__gt=date.today()) & Q(status="OP")) | Q(selected_donor=self.request.user.donor_profile))
                results = queryset.filter(
                    Q(seeker__name__icontains=search_param) | Q(seeker__name__icontains=search_param) | Q(
                        seeker__zip_code__icontains=search_param) | Q(seeker__country__icontains=search_param) | Q(
                        seeker__website__icontains=search_param) | Q(blood_group__icontains=search_param))
            elif type == "tests":
                queryset = OfferedTest.objects.filter(
                    (Q(expiry_date__gt=date.today()) | Q(donors_who_bought=self.request.user.donor_profile)))
                results = queryset.filter(
                    Q(seeker__name__icontains=search_param) | Q(seeker__name__icontains=search_param) | Q(
                        seeker__zip_code__icontains=search_param) | Q(seeker__country__icontains=search_param) | Q(
                        seeker__website__icontains=search_param) | Q(test_type__icontains=search_param))
            else:
                results = []
            serializer = self.get_serializer(results, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Sorry only Donors can search these requests"},
                status=status.HTTP_400_BAD_REQUEST)
