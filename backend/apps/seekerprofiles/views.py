from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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
