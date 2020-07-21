from django.shortcuts import render

# Create your views here.
from rest_framework import status

from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.seekerprofiles.serializers import SeekerProfileSerializer


class RetrieveUpdateDestroyLoggedInUser(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve logged-in User.

    update:
    Update User.

    delete:
    Delete logged-in User.
    """
    permission_classes = (IsAuthenticated,)

    http_method_names = ['get', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.user.is_donor:
            return DonorProfileSerializer
        else:
            return SeekerProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        if self.request.user.is_donor:
            serializer = self.get_serializer(request.user.donor_profile)
        else:
            serializer = self.get_serializer(request.user.seeker_profile)
        return Response(serializer.data)

    def get_object(self):
        if self.request.user.is_donor:
            return self.request.user.donor_profile
        else:
            return self.request.user.seeker_profile

    def destroy(self, request, *args, **kwargs):
        instance = request.user
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

