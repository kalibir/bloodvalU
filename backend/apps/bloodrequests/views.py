from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.bloodrequests.models import BloodRequest
from apps.bloodrequests.permissions import IsRequesterOrAdminOrReadOnly
from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.users.permissions import ReadOnly


class CreateBloodRequestView(CreateAPIView):
    """
    GET:
    List all Requests.
    POST:
    Create a Request.
    """
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(seeker=self.request.user.seeker_profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListAllBloodRequestsView(ListAPIView):
    """
    GET:
    List all Blood Requests in most recently created order.
    """
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = BloodRequest.objects.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class RetrieveUpdateDestroyBloodRequestView(RetrieveUpdateDestroyAPIView):
    """
    UPDATE:
    Update Request.
    GET:
    Retrieve single Request.
    DELETE:
    Delete Request.
    """
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    queryset = BloodRequest.objects.all()
    serializer_class = BloodRequestSerializer
    lookup_url_kwarg = 'request_id'
    http_method_names = ['get', 'patch', 'delete']

    def perform_update(self, serializer):
        serializer.save(seeker=self.request.user.seeker_profile)
