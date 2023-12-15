from rest_framework import serializers, authentication, exceptions
from django.contrib.auth.hashers import make_password, check_password
from django.http import HttpResponse
from .models import *
import datetime
import jwt
from SmartPharmacy import settings


class RegistrationSerialization(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['name', 'email', 'password', 'date_of_birth']

    def create(self, validated_data):
        passw = validated_data.get('password')
        passw = make_password(passw)
        validated_data['password'] = passw
        validated_data['role'] = Roles.objects.get(name='user')
        user = Users.objects.create(**validated_data)
        return user


class AuntificationSerialization(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email', 'password']

    def createToken(self, validated_date):
        try:
            user = Users.objects.get(email=validated_date.get('email'))
        except:
            raise Exception("Not found user")
        check_pas = check_password(validated_date.get('password'), user.password)
        if not check_pas:
            raise Exception('bad password')
        dt = datetime.datetime.now() + datetime.timedelta(days=1)
        print(dt)
        token = jwt.encode({
            'id': user.pk,
            'exp': int(dt.timestamp())},
            key=settings.SECRET_KEY)

        return token.decode('utf-8')


class CustomAuthorization(authentication.BaseAuthentication):
    key = 'Token'

    def authenticate(self, request):
        request.user = None
        auth = authentication.get_authorization_header(request).split()
        if not auth or self.key.lower().encode() != auth[0].lower():
            return None
        token = auth[1].decode('utf-8')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = Users.objects.get(pk=payload.get('id'))
        except Exception as e:
            print(f"Error: {e}")
            msg = "Failed auth"
            raise exceptions.AuthenticationFailed(msg)
        if payload['exp'] > datetime.datetime.now().timestamp():
            raise exceptions.NotAuthenticated()
        return (user, token)
