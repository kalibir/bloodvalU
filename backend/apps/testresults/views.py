from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.bloodrequests.permissions import IsRequesterOrAdminOrReadOnly
from apps.donorprofiles.models import DonorProfile
from apps.offeredtests.models import OfferedTest
from apps.testresults.serializers import TestResultSerializer
from apps.users.permissions import ReadOnly


class CreateTestResultView(CreateAPIView):
    serializer_class = TestResultSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        target_donor = DonorProfile.objects.get(id=self.kwargs['donor_id'])
        target_test = OfferedTest.objects.get(id=self.kwargs['test_id'])
        serializer.save(donor=target_donor, type_of_test=target_test)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


