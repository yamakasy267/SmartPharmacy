from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
import json


class Registration(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerialization

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except Exception as e:
            return HttpResponse(status=500, content=f"Failed to register because {e}")
        return HttpResponse(status=200, )


class Auntification(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = AuntificationSerialization

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = {**serializer.validated_data, **kwargs}
        try:
            token = serializer.createToken(validated_data)
        except Exception as e:
            return HttpResponse(status=500, content=f"Failed authorization because {e}")
        return HttpResponse(status=200, content=json.dumps({"token": f"Token {token}"}))
