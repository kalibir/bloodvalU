from django.urls import path

from apps.testresults.views import CreateTestResultView, ListDonorsWhoBoughtOfferedTest

urlpatterns = [
    path('new/', CreateTestResultView.as_view(), name='upload-test-results'),
    path('new/', ListDonorsWhoBoughtOfferedTest.as_view(), name='get-buyers-of-specific-request'),
]