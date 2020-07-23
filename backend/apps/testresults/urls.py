from django.urls import path

from apps.testresults.views import CreateTestResultView

urlpatterns = [
    path('new/', CreateTestResultView.as_view(), name='upload-test-results'),
]