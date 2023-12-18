from django.urls import path, include
from .views import *
from .scrabing_pharmacy import Scrap
from django.urls import reverse
urlpatterns = [
    path('registration/', Registration.as_view()),
    path('login/', Auntification.as_view()),
    path('test/', TestScrap.as_view()),
]
