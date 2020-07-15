from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.seekerprofiles.models import SeekerProfile
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class ListAllSeekersView(ListAPIView):
    """
    List all Seekers.
    """
    serializer_class = SeekerProfileSerializer
    queryset = SeekerProfile.objects.filter(user__is_donor=False)
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
