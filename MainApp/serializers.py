from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from .models import *

class RegistrationSerialization(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields =['name', 'email', 'password', 'date_of_birth']

    def create(self, validated_data):
        passw = validated_data.get('password')
        passw = make_password(passw)
        validated_data['password'] = passw
        user = Users.objects.create(**validated_data)
        return user