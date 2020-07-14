from django.contrib.auth import get_user_model
from django.core.mail import send_mail, EmailMessage
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.registrations.models import Registration
from apps.registrations.serializers import RegistrationSerializer, ResetPasswordSerializer, CreateUserSerializer
from apps.registrations.models import code_generator
from apps.users.serializer import UserSerializer

User = get_user_model()


class RequestForRegistration(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        target_profile = Registration.objects.get(email=request.data['email'])
        send_mail(
            'Thanks for registering',
            f'See your account creation code: {target_profile.code}',
            'students@propulsionacademy.com',
            [request.data['email']],
            fail_silently=False,
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateUserView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        target_profile = Registration.objects.get(email=request.data['email'])
        user = User.objects.create_user(request.data['username'], request.data['email'],
                                        request.data['password'])

        self.perform_create(user)
        target_profile.user = user
        target_profile.save()
        return Response(status=status.HTTP_201_CREATED)


class CreateValidationCodeForPasswordReset(CreateAPIView):
    permission_classes = []
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        try:
            target_profile = Registration.objects.get(email=request.data['email'])
            target_profile.code = code_generator()
            target_profile.save()
            email = EmailMessage()
            email.subject = 'Your password Reset code'
            email.body = f'See your password reset code:{target_profile.code}'
            email.to = [target_profile.email]
            email.send(fail_silently=False)
            return Response(status=status.HTTP_201_CREATED)
        except Registration.DoesNotExist:
            return Response({"detail": "Your email isn't valid."}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(UpdateAPIView):
    permission_classes = []
    serializer_class = ResetPasswordSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        target_profile = Registration.objects.get(email=request.data['email'])
        target_profile.user.set_password(request.data['password'])
        target_profile.user.save()
        target_profile.code = code_generator()
        target_profile.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class TokenUserObtainView(TokenObtainPairView):
    """
    post:
    Create a new session for a user. Sends back tokens and user.
    """

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        user = User.objects.get(email=request.data['email'])
        req = request
        req.user = user
        user_serializer = UserSerializer(instance=user, context={'request': req})
        res = {
            **serializer.validated_data,
            'user': user_serializer.data
        }

        return Response(res, status=status.HTTP_200_OK)
