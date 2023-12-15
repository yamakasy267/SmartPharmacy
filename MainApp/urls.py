from django.urls import path, include
from .views import *

urlpatterns = [
    path('registration/', Registration.as_view()),
    path('login/', Auntification.as_view())
]
