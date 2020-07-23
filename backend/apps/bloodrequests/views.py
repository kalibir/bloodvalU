import datetime

from django.core.mail import EmailMessage
# Create your views here.
from django.db.models import Q

from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.donordata.models import DonorData
from apps.donordata.serializers import DonorDataSerializer
from apps.registrations.models import code_generator

from apps.bloodrequests.models import BloodRequest
from apps.bloodrequests.permissions import IsRequesterOrAdminOrReadOnly, IsDonorOrReadOnly
from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer
from apps.seekerprofiles.models import SeekerProfile
from apps.users.permissions import ReadOnly


class CreateBloodRequestView(CreateAPIView):
    """
    GET:
    List all blood Requests.
    POST:
    Create a Blood Request. Upon creation of the request,
    an email will be sent to all corresponding donors with matching blood types
    """
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_target_blood_type_emails(self, blood_group):
        target_blood_type_emails = []
        for donor_profile in DonorProfile.objects.all():
            if donor_profile.blood_group == blood_group:
                target_blood_type_emails.append(donor_profile.user.email)
        return target_blood_type_emails

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # v Attila
        unique_request_id = code_generator(length=8)
        while BloodRequest.objects.filter(unique_request_id=unique_request_id).count() > 0:
            unique_request_id = code_generator(length=8)
        # ^ Attila
        serializer.save(seeker=self.request.user.seeker_profile, unique_request_id=unique_request_id)
        target_emails = self.get_target_blood_type_emails(serializer.validated_data.get('blood_group'))
        if target_emails:
            email = EmailMessage()
            email.subject = '{seeker_name} is looking for blood donations!'.format(
                seeker_name=request.user.seeker_profile.name)
            email.body = '{seeker_name} is looking for donors with a blood type of {request_blood_type}.\nYou your blood type seems to match, be sure to contact them at {seeker_street}, {seeker_zip_code}!'.format(
                seeker_name=request.user.seeker_profile.name,
                request_blood_type=serializer.validated_data.get('blood_group'),
                seeker_street=request.user.seeker_profile.street, seeker_zip_code=request.user.seeker_profile.zip_code)
            email.to = target_emails
            email.send(fail_silently=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
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


class ListAllRequestsOfSpecificSeeker(ListAPIView):
    """
    GET:
    List all Blood Requests of a specific seeker.
    """
    serializer_class = BloodRequestSerializer
    queryset = SeekerProfile
    permission_classes = [IsAuthenticated | ReadOnly]
    lookup_url_kwarg = 'seeker_id'

    def list(self, request, *args, **kwargs):
        target_seeker = self.get_object()
        queryset = target_seeker.made_requests.all().order_by('-created')
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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        target_selected_donor = instance.selected_donor
        if target_selected_donor:
            target_selected_donor.has_been_selected = False
            target_selected_donor.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ToggleApplyToRequestView(CreateAPIView):
    """
    POST:
    Toggle applying to a blood request by including the target
    blood request in the url.
    """
    permission_classes = [IsDonorOrReadOnly]
    queryset = BloodRequest
    serializer_class = BloodRequestSerializer
    lookup_url_kwarg = 'request_id'

    def post(self, request, *args, **kwargs):
        target_blood_request = self.get_object()
        if not self.request.user.is_donor:
            return Response({"detail": "Only donors can apply to requests"}, status=status.HTTP_400_BAD_REQUEST)
        if target_blood_request.status == "OP" or target_blood_request.selected_donor == self.request.user.donor_profile:
            target_donor = self.request.user.donor_profile
            if target_donor.has_been_selected and target_donor != target_blood_request.selected_donor:
                return Response(
                    {"detail": "You have already been selected in another request, you can no longer apply"},
                    status=status.HTTP_400_BAD_REQUEST)
            apply_relation = target_donor in target_blood_request.applicants.all()
            if apply_relation and target_blood_request.selected_donor == target_donor:
                target_blood_request.applicants.remove(target_donor)
                target_blood_request.status = 'OP'
                target_blood_request.selected_donor = None
                target_donor.has_been_selected = False
                target_donor.save()
                target_blood_request.save()
            elif apply_relation:
                target_blood_request.applicants.remove(target_donor)
                target_donor.save()
            else:
                target_blood_request.applicants.add(target_donor)
                target_donor.save()
            return Response(self.get_serializer(target_blood_request).data)
        else:
            return Response(
                {
                    "detail": "status: {status} Sorry, you can no longer apply to this request, you are either already selected, or this request is closed/completed.".format(
                        status=target_blood_request.status)},
                status=status.HTTP_400_BAD_REQUEST)


class ListApplicantsOfSpecificRequestView(ListAPIView):
    """
    GET:
    List all applicants of a single blood request by including the target
    blood request ID in the url.
    """
    permission_classes = [IsAuthenticated | ReadOnly]
    serializer_class = DonorProfileSerializer
    lookup_url_kwarg = 'request_id'
    queryset = BloodRequest

    def list(self, request, *args, **kwargs):
        target_blood_request = self.get_object()
        target_applicants = target_blood_request.applicants.filter(
            (Q(has_been_selected=False) | Q(accepted_requests=target_blood_request.selected_donor)))
        serializer = self.get_serializer(target_applicants, many=True)
        return Response(serializer.data)


class SelectDonorFromApplicantsView(CreateAPIView):
    """
    POST:
    Select a donor from the list of applicants in the Request with the,
    blood request ID in the url. If the chosen donor is already the selected donor, he will be toggled out.
    """
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    queryset = BloodRequest
    serializer_class = BloodRequestSerializer
    lookup_url_kwarg = 'request_id'

    def post(self, request, *args, **kwargs):
        target_blood_request = self.get_object()  # We found the post with 'post_id'
        target_applicant = DonorProfile.objects.get(id=self.kwargs['donor_id'])
        if target_applicant == target_blood_request.selected_donor:
            target_blood_request.selected_donor = None
            target_applicant.has_been_selected = False
            target_blood_request.status = "OP"
            target_applicant.save()
            target_blood_request.save()
            return Response(self.get_serializer(target_blood_request).data)
        elif target_applicant in target_blood_request.applicants.all():
            target_applicant = DonorProfile.objects.get(id=self.kwargs['donor_id'])
            target_blood_request.selected_donor = target_applicant
            target_applicant.has_been_selected = True
            target_blood_request.status = "CL"
            target_blood_request.save()
            target_applicant.save()
            email = EmailMessage()
            code1 = target_blood_request.unique_request_id
            code2 = target_applicant.unique_donor_id
            code = '{code1}.{code2}'.format(code1=code1, code2=code2)
            email.subject = 'Congratulations you have been Selected for a Blood Donation!'
            # email.body = '{seeker_name} would like you to come and donate blood at their site at {seeker_street}, {seeker_zip_code}!'.format(
            #     seeker_name=request.user.seeker_profile.name,
            #     seeker_street=request.user.seeker_profile.street, seeker_zip_code=request.user.seeker_profile.zip_code)
            email.body = 'At {seeker_name}, we are happy for that, you are choose us for donation. /n' \
                         'Our colleagues soon will make contact you, to discuss the followings. /n' \
                         'Your code for this donation is: {code}'.format(seeker_name=request.user.seeker_profile.name,
                                                                         code=code)
            email.to = [target_applicant.user.email]
            email.send(fail_silently=False)
            return Response(self.get_serializer(target_blood_request).data)
        else:
            return Response({"detail": "The Donor you selected is not an applicant!"},
                            status=status.HTTP_400_BAD_REQUEST)


class MarkRequestAsOpenView(CreateAPIView):
    """
    POST:
    Mark a request as open by placing the request ID in the url.
    Once re-opened the selected donor will be set to null, and the status will be set to open
    """
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    queryset = BloodRequest
    serializer_class = BloodRequestSerializer
    lookup_url_kwarg = 'request_id'

    def post(self, request, *args, **kwargs):
        target_blood_request = self.get_object()  # We found the post with 'post_id'
        target_blood_request.status = "OP"
        target_blood_request.selected_donor = None
        target_blood_request.save()
        return Response(self.get_serializer(target_blood_request).data)


class MarkRequestAsCompletedView(CreateAPIView):
    """
    POST:
    Mark a request as completed by placing the request ID in the url.
    Once completed the donor will receive the corresponding points value
    of the request and will also be notified by email for his good deeds :).
    Already completed request cannot be re-completed to avoid abusing the points system.
    """
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    queryset = BloodRequest
    serializer_class = BloodRequestSerializer
    lookup_url_kwarg = 'request_id'

    def post(self, request, *args, **kwargs):
        target_blood_request = self.get_object()
        target_donor = target_blood_request.selected_donor
        if target_donor is None:
            return Response({"detail": "You cannot complete a request with no selected donor"},
                            status=status.HTTP_400_BAD_REQUEST)
        elif target_blood_request.status == "COM":
            return Response({"detail": "This request has already been completed"},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            target_blood_request.status = "COM"
            target_donor.last_donation = datetime.datetime.now()
            target_donor.total_points += int(target_blood_request.points_value)
            target_donor.has_been_selected = False
            target_donor.save()
            for donor in target_blood_request.applicants.all():
                new_data = DonorData.objects.create(
                    blood_request=target_blood_request,
                    zip_code=donor.zip_code,
                    birthday=donor.birthday,
                    selected_donor=bool(donor == target_blood_request.selected_donor),
                    country=donor.country,
                    street=donor.street,
                    gender=donor.gender,
                    blood_group=donor.blood_group,
                )
                new_data.save()
            target_blood_request.save()
            if target_blood_request.is_renewable:
                cloned_blood_request = BloodRequest.objects.get(id=target_blood_request.id)
                cloned_blood_request.id = None
                cloned_blood_request.save()
                cloned_blood_request.status = 'OP'
                cloned_blood_request.selected_donor = None
                cloned_blood_request.applicants.clear()
                cloned_blood_request.save()
            email = EmailMessage()
            email.subject = 'Thanks for Donating :)'
            email.body = '{seeker_name} would like you to thank you for your generous blood donation.\n{points_value} points have been added to your profile, enjoy!'.format(
                seeker_name=request.user.seeker_profile.name, points_value=target_blood_request.points_value)
            email.to = [target_donor.user.email]
            email.send(fail_silently=False)
            return Response(self.get_serializer(target_blood_request).data)


class GetStatisticsOfBloodRequestView(ListAPIView):
    lookup_url_kwarg = 'request_id'
    queryset = BloodRequest
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    serializer_class = DonorDataSerializer

    def list(self, request, *args, **kwargs):
        if self.request.user.is_donor:
            return Response({"detail": "Sorry, you must be a seeker to perform this request"},
                            status=status.HTTP_400_BAD_REQUEST)
        target_blood_request = self.get_object()
        donor_data = target_blood_request.statistics.all()
        serializer = self.get_serializer(donor_data, many=True)
        return Response(serializer.data)
