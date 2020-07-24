from django.core.mail import EmailMessage

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer, GetBuyersOfOfferedTestSerializer
from apps.offeredtests.models import OfferedTest
from apps.testresults.serializers import TestResultSerializer
from apps.users.permissions import ReadOnly


class CreateTestResultView(CreateAPIView):
    """
    POST:
    Upload the results of an offered test for a user who bought the tests by
    making an object with the properties donor and test_id.
    """
    serializer_class = TestResultSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        target_donor = DonorProfile.objects.get(id=int(request.data['donor']))
        target_test = OfferedTest.objects.get(id=int(request.data['test_id']))
        serializer.save(donor=target_donor, offered_test=target_test)
        seeker = self.request.user.seeker_profile  # TODO To be worked on with HTML and to be made more personal
        email = EmailMessage()
        email.subject = 'Your test Results are available!'
        email.body = 'Hey {donor_name}, /n Your test results are now available for download on your profile page.'.format(
            donor_name=target_donor.first_name)
        email.to = [target_donor.user.email]
        email.send(fail_silently=False)
        self.serializer_class = GetBuyersOfOfferedTestSerializer
        serialized_donor = self.get_serializer(target_donor)
        return Response(serialized_donor.data)
