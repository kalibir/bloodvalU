from django.urls import path

from apps.offeredtests.views import CreateOfferedTestView, RetrieveUpdateDestroyOfferedTestView, BuyOfferedTestView, \
    ListAllSeekersOfferedTestsView, ListDonorsWhoBoughtOfferedTest

urlpatterns = [
    path('new/', CreateOfferedTestView.as_view(), name='create-an-offered-test'),
    path('<int:test_id>/', RetrieveUpdateDestroyOfferedTestView.as_view(), name='retrieve-update-destroy-offered-test'),
    path('buy/<int:test_id>/', BuyOfferedTestView.as_view(), name='buy-an-offered-test'),
    path('customers/<int:test_id>/', ListDonorsWhoBoughtOfferedTest.as_view(), name='get-buyers-of-specific-request'),
    path('seeker/<int:seeker_id>/', ListAllSeekersOfferedTestsView.as_view(),
         name='list-all-offered-tests-of-specific-seeker'),
]
