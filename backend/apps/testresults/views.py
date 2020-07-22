from django.core.mail import EmailMessage
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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
        target_donor = DonorProfile.objects.get(id=int(request.data['type_of_test']))
        target_test = OfferedTest.objects.get(id=int(request.data['donor']))
        serializer.save(donor=target_donor, type_of_test=target_test)
        email = EmailMessage()
        email.subject = 'Your test Results are available!'
        email.body = 'Hey {donor_name},/nYour test results are now available for download on your profile page.'.format(
            donor_name=target_donor.frist_name)
        email.to = [target_donor.email]
        email.send(fail_silently=False)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
