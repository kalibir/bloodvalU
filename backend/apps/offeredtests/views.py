from datetime import date

from django.core.mail import EmailMessage
from django.core.mail import send_mail

from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.bloodrequests.permissions import IsRequesterOrAdminOrReadOnly, IsDonorOrReadOnly
from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.offeredtests.models import OfferedTest
from apps.offeredtests.serializers import OfferedTestSerializer
from apps.seekerprofiles.models import SeekerProfile
from apps.users.permissions import ReadOnly


class CreateOfferedTestView(CreateAPIView):
    serializer_class = OfferedTestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(seeker=self.request.user.seeker_profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveUpdateDestroyOfferedTestView(RetrieveUpdateDestroyAPIView):
    """
    UPDATE:
    Update Offered Test.
    GET:
    Retrieve single Offered Test.
    DELETE:
    Delete Offered Test.
    """
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    queryset = OfferedTest.objects.all()
    serializer_class = OfferedTestSerializer
    lookup_url_kwarg = 'test_id'
    http_method_names = ['get', 'patch', 'delete']

    def perform_update(self, serializer):
        serializer.save(seeker=self.request.user.seeker_profile)


class BuyOfferedTestView(CreateAPIView):
    """
    POST:
    Buy an offered test by placing the target test in the url.
    Can only buy if you have sufficent points
    """
    permission_classes = [IsDonorOrReadOnly]
    queryset = OfferedTest
    serializer_class = OfferedTestSerializer
    lookup_url_kwarg = 'test_id'

    def post(self, request, *args, **kwargs):
        target_offered_test = self.get_object()
        target_seeker = target_offered_test.seeker
        donor = self.request.user.donor_profile
        email_address = self.request.user.email
        # if donor in target_offered_test.donors_who_bought.all():
        #     return Response(
        #         {"detail": "You already bought this Offered Test"},
        #         status=status.HTTP_400_BAD_REQUEST)
        if date.today() > target_offered_test.expiry_date:
            return Response(
                {"detail": "Sorry this offered test is expired"},
                status=status.HTTP_400_BAD_REQUEST)
        if int(donor.total_points) < int(target_offered_test.points_cost):
            return Response(
                {"detail": "Sorry you insufficient points :("},
                status=status.HTTP_400_BAD_REQUEST)
        elif donor in target_offered_test.donors_who_bought.all():
            pass
        else:
            donor.total_points -= int(target_offered_test.points_cost)
            donor.save()
            target_offered_test.donors_who_bought.add(donor)

        test_code = "{test_code}.{donor_id}".format(test_code=target_offered_test.secret_code,
                                                    donor_id=donor.unique_donor_id)
        subject = 'Validation code for your test'
        message = f'Here is your test code: {test_code}'
        to = [email_address]
        qr_img = f'https://qrickit.com/api/qr.php?d={test_code}&addtext=BloodvalU'
        donor_name = f'{donor.first_name} {donor.last_name}'
        sender = ''
        html_message = f"""<!doctype html>
        <html lang=en>
            <head>
                <meta charset=utf-8>
                <title>Blood test</title>
            </head>
            <body>
                <h2><strong>Thank you very much for choosing one of our tests.</strong></h2>
                <p>&nbsp;</p>
                <h3>Dear <strong>{donor_name}</strong>,</h3>
                <p>&nbsp;</p>
                <p>Please call us at {target_seeker.phone} or connect us through our website {target_seeker.website} for an appointment.</p>
                <p>For the test, you will need the QR above, so please not forget to bring it with you for the test, either in your phone or in printed form. (Mind the environment, please.)</p>
                <p><img src='{qr_img}'/></p>
                <p>&nbsp;</p>
                <p>Best regards,</p>
                <p>{target_seeker.name}</p>                
                </p>
            </body>
        </html>"""
        send_mail(subject=subject, message=message, html_message=html_message, from_email=sender, recipient_list=to,
                  fail_silently=False)
        # Attila2

        return Response(self.get_serializer(target_offered_test).data)


class ListAllSeekersOfferedTestsView(ListAPIView):
    """
    GET:
    List all Offered Tests of seeker in most recently created order by providing their ID in the url.
    """
    serializer_class = OfferedTestSerializer
    lookup_url_kwarg = 'seeker_id'
    queryset = SeekerProfile
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        target_seeker = self.get_object()
        seeker_offered_tests = target_seeker.offered_tests.all()
        serializer = self.get_serializer(seeker_offered_tests, many=True)
        return Response(serializer.data)


class ListDonorsWhoBoughtOfferedTest(ListAPIView):
    lookup_url_kwarg = 'test_id'
    serializer_class = DonorProfileSerializer
    queryset = OfferedTest
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        target_offered_test = self.get_object()
        customers = target_offered_test.donors_who_bought.all()
        serializer = self.get_serializer(customers, many=True)
        return Response(serializer.data)


class ListAllOfferedTestsView(ListAPIView):
    """
    GET:
    List all Offered Tests in most recently created order.
    """
    serializer_class = OfferedTestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = OfferedTest.objects.all().order_by('-created')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
