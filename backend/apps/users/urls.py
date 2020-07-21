from django.urls import path

from apps.users.views import RetrieveUpdateDestroyLoggedInUser

urlpatterns = [
    path('me/', RetrieveUpdateDestroyLoggedInUser.as_view(), name='retrieve-update-destroy-logged-in-user'),
]
