from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from apps.registrations.views import RequestForRegistration, TokenUserObtainView, CreateUserView, \
    CreateValidationCodeForPasswordReset, ResetPasswordView

urlpatterns = [
    path('token/', TokenUserObtainView.as_view()),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view()),
    path('token/verify/', jwt_views.TokenVerifyView.as_view()),
    path('registration/', RequestForRegistration.as_view()),
    path('registration/validation/', CreateUserView.as_view()),
    path('password-reset/', CreateValidationCodeForPasswordReset.as_view(),
         name='get_validation_code_for_password_reset'),
    path('password-reset/validation/', ResetPasswordView.as_view(), name='reset_password'),
]
