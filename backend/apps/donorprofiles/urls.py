from django.urls import path

from apps.donorprofiles.views import ListAllDonorsView, RetrieveDonorView

urlpatterns = [
    path('list/', ListAllDonorsView.as_view(), name='list-all-seekers'),
    path('<int:donor_id>/', RetrieveDonorView.as_view(), name='get-specific-donor'),

]