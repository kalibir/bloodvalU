from django.urls import path

from apps.bloodrequests.views import CreateBloodRequestView, ListAllBloodRequestsView, \
    RetrieveUpdateDestroyBloodRequestView, ToggleApplyToRequestView, ListApplicantsOfSpecificRequestView, \
    SelectDonorFromApplicantsView, MarkRequestAsOpenView, MarkRequestAsCompletedView, ListAllRequestsOfSpecificSeeker, \
    GetStatisticsOfBloodRequestView, ValidateBloodRequestQRCodeView, GetAllStatisticsOfSeekerView

urlpatterns = [
    path('new/', CreateBloodRequestView.as_view(), name='create-a-blood-request'),
    path('list/', ListAllBloodRequestsView.as_view(), name='list-all-blood-requests'),
    path('<int:request_id>/', RetrieveUpdateDestroyBloodRequestView.as_view(), name='edit-get-delete-request'),
    path('apply/<int:request_id>/', ToggleApplyToRequestView.as_view(), name='toggle-applying-for-a-blood-request'),
    path('applicants/<int:request_id>/', ListApplicantsOfSpecificRequestView.as_view(),
         name='list-all-applicants-of-specific-request'),
    path('<int:request_id>/assign/<int:donor_id>/', SelectDonorFromApplicantsView.as_view(),
         name='assign-an-applicant-as-selected-donor'),
    path('open/<int:request_id>/', MarkRequestAsOpenView.as_view(), name='mark-request-as-open'),
    path('seeker/<int:seeker_id>/', ListAllRequestsOfSpecificSeeker.as_view(), name='get-requests-of-specific-seeker'),
    path('statistics/<int:request_id>/', GetStatisticsOfBloodRequestView.as_view(), name='get-statistics-of-request'),
    path('statistics/me/', GetAllStatisticsOfSeekerView.as_view(), name='get-all-of-seekers-statistics-on-requests'),
    path('complete/<int:request_id>/', MarkRequestAsCompletedView.as_view(), name='mark-request-as-complete'),
    path('validate/', ValidateBloodRequestQRCodeView.as_view(), name='validate-a-blood-request-qr-code'),
]
