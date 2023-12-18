from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
import jwt
from django.conf import settings
from .models import Users
from rest_framework import exceptions


class JWTAuthorization(authentication.BaseAuthentication):
    key = "Token"

    def authenticate(self, request):
        auth = authentication.get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.key.lower().encode():
            return None
        token = auth[1].decode('utf-8')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = Users.objects.get(pk=payload.get('id'))
        except Exception as e:
            msg = "Failed auth"
            raise exceptions.NotAuthenticated(msg)
        return (user, token)


class IsAuth(IsAuthenticated):
    def has_permission(self, request, view):
        return bool(request.user)
