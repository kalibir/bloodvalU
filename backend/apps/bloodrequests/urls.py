from django.urls import path

from apps.bloodrequests.views import CreateBloodRequestView, ListAllBloodRequestsView, \
    RetrieveUpdateDestroyBloodRequestView, ToggleApplyToRequestView, ListApplicantsOfSpecificRequestView, \
    SelectDonorFromApplicantsView

urlpatterns = [
    path('new/', CreateBloodRequestView.as_view(), name='create-a-blood-request'),
    path('list/', ListAllBloodRequestsView.as_view(), name='list-all-blood-requests'),
    path('<int:request_id>/', RetrieveUpdateDestroyBloodRequestView.as_view(), name='edit-get-delete-request'),
    path('apply/<int:request_id>/', ToggleApplyToRequestView.as_view(), name='toggle-applying-for-a-blood-request'),
    path('applicants/<int:request_id>/', ListApplicantsOfSpecificRequestView.as_view(),
         name='list-all-applicants-of-specific-request'),
    path('<int:request_id>/assign/<int:donor_id>/', SelectDonorFromApplicantsView.as_view(),
         name='assign-an-applicant-as-selected-donor'),
]
