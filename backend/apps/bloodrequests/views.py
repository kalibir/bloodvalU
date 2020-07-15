from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.bloodrequests.models import BloodRequest
from apps.bloodrequests.permissions import IsRequesterOrAdminOrReadOnly, IsDonorOrReadOnly
from apps.bloodrequests.serializers import BloodRequestSerializer
from apps.donorprofiles.models import DonorProfile
from apps.donorprofiles.serializers import DonorProfileSerializer
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
        receiver = self.get_object()  # We found the post with 'post_id'
        requester = self.request.user.donor_profile
        apply_relation = requester in receiver.applicants.all()
        if apply_relation:
            receiver.applicants.remove(requester)
        else:
            receiver.applicants.add(requester)
        return Response(self.get_serializer(receiver).data)


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
        target_applicants = target_blood_request.applicants.all()
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
            target_blood_request.save()
            return Response(self.get_serializer(target_blood_request).data)
        elif target_applicant in target_blood_request.applicants.all():
            target_blood_request.selected_donor = target_applicant
            target_blood_request.save()
            return Response(self.get_serializer(target_blood_request).data)
        else:
            return Response({"detail": "Your selected Donor is not an applicant!"}, status=status.HTTP_400_BAD_REQUEST)


class MarkRequestAsOpenView(CreateAPIView):
    permission_classes = [IsRequesterOrAdminOrReadOnly]
    queryset = BloodRequest
    serializer_class = BloodRequestSerializer
    lookup_url_kwarg = 'request_id'

    def post(self, request, *args, **kwargs):
        target_blood_request = self.get_object()  # We found the post with 'post_id'
        target_blood_request.status = "OP"
        target_blood_request.save()
        return Response(self.get_serializer(target_blood_request).data)
