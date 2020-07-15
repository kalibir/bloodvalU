from django.urls import path

from apps.seekerprofiles.views import ListAllSeekersView, RetrieveSeekerView

urlpatterns = [
    path('list/', ListAllSeekersView.as_view(), name='list-all-seekers'),
    path('<int:seeker_id>/', RetrieveSeekerView.as_view(), name='get-specific-seeker'),
]