from django.urls import path

from apps.donorprofiles.views import ListAllDonorsView, RetrieveDonorView, ListDonorsAppliedToRequestsView, \
    FilterOrListAllAvailableRequestsOrTestsForDonor

urlpatterns = [
    path('list/', ListAllDonorsView.as_view(), name='list-all-seekers'),
    path('<int:donor_id>/', RetrieveDonorView.as_view(), name='get-specific-donor'),
    path('requests/applied/', ListDonorsAppliedToRequestsView.as_view(), name='list-all-applied-to-requests'),
    path('search/', FilterOrListAllAvailableRequestsOrTestsForDonor.as_view(),
         name='filter-or-list-all-available-requests-or-tests-for-donor'),
]
