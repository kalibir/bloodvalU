from django.urls import path

from apps.seekerprofiles.views import ListAllSeekersView, RetrieveSeekerView, FilterSeekersRequestsByStatus

urlpatterns = [
    path('list/', ListAllSeekersView.as_view(), name='list-all-seekers'),
    path('<int:seeker_id>/', RetrieveSeekerView.as_view(), name='get-specific-seeker'),
    path('search/', FilterSeekersRequestsByStatus.as_view(), name='filter-seeker-requests-by-status'),
]