from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import AllowAny
import json
from rest_framework.response import Response
from .Auth import IsAuth, JWTAuthorization
from .scrabing_pharmacy import Scrap


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


class GetMedicine(generics.ListAPIView):
    permission_classes = [IsAuth]
    authentication_classes = [JWTAuthorization]

    def get(self, request, *args, **kwargs):
        if request.data.get('medecine_id'):
            med = Medicines.objects.get(pk=request.data['medecine_id'])
        else:
            med = Medicines.objects.all().values()
        return Response(status=200, data={'mde': med})


class TestScrap(generics.ListAPIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        Scrap()
        return Response(status=200)
