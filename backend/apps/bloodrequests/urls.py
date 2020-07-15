from django.urls import path

from apps.bloodrequests.views import CreateBloodRequestView, ListAllBloodRequestsView, \
    RetrieveUpdateDestroyBloodRequestView

urlpatterns = [
    path('new/', CreateBloodRequestView.as_view(), name='create-a-blood-request'),
    path('list/', ListAllBloodRequestsView.as_view(), name='list-all-blood-requests'),
    path('<int:request_id>/', RetrieveUpdateDestroyBloodRequestView.as_view(), name='edit-get-delete-request'),
]