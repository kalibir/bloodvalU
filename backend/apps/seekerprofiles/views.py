from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from apps.bloodrequests.permissions import IsAdminOrReadOnly
from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.offeredtests.serializers import OfferedTestSerializer
from apps.registrations.models import get_or_none
from apps.seekerprofiles.models import SeekerProfile
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class ListAllSeekersView(ListAPIView):
    """
    List all Seekers.
    """
    serializer_class = SeekerProfileSerializer
    queryset = SeekerProfile.objects.filter(user__is_donor=False).order_by('-created')
    permission_classes = (IsAuthenticatedOrReadOnly,)


class RetrieveSeekerView(RetrieveAPIView):
    """
    Retrieve one User.
    """
    serializer_class = SeekerProfileSerializer
    queryset = SeekerProfile.objects.all()
    lookup_url_kwarg = 'seeker_id'
    permission_classes = (IsAuthenticatedOrReadOnly,)


class FilterSeekersRequestsByStatus(ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = BloodRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.request.user.seeker_profile.made_requests.all().order_by('-created')
        req_status = self.request.query_params.get('request_status')
        results = queryset.filter(Q(status__icontains=req_status))
        serializer = self.get_serializer(results, many=True)
        return Response(serializer.data)


class ListAllOfferedTestOfLoggedInSeeker(ListAPIView):
    """
    List all the offered tests of a logged in seeker.
    """
    serializer_class = OfferedTestSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def list(self, request, *args, **kwargs):
        if not self.request.user.is_donor:
            queryset = self.request.user.seeker_profile.offered_tests.all().order_by('-created')
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Sorry, you must be a seeker to perform this request"},
                status=status.HTTP_400_BAD_REQUEST)


class ToggleVerifySeekerView(CreateAPIView):
    """
    POST:
    Toggle making a seeker valid, ONLY ADMIN
    """
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = SeekerProfileSerializer

    def post(self, request, *args, **kwargs):
        target_seeker = get_or_none(SeekerProfile, id=self.kwargs['seeker_id'])
        if target_seeker:
            target_seeker.is_valid = not target_seeker.is_valid
            target_seeker.save()
            return Response(self.get_serializer(target_seeker).data)
        else:
            return Response({"detail": "This Seeker Does not exist"}, status=status.HTTP_400_BAD_REQUEST)
