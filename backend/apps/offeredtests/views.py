from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response


class CreateOfferedTestView(CreateAPIView):

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(seeker=self.request.user.seeker_profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)