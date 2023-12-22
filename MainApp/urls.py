from django.urls import path, include
from .views import *
from .scrabing_pharmacy import Scrap
from django.urls import reverse

urlpatterns = [
    path('registration/', Registration.as_view()),
    path('login/', Auntification.as_view()),
    path('scrap/', TestScrap.as_view()),
    path('get_medicine/', GetMedicine.as_view()),
    path('get_medicine_for_element/', GetMedicineForActiveElement.as_view()),
    path('get_medicine_for_name/', GetMedicineForName.as_view()),
    path('get_medicine_for_category/', GetMedicineForCategory.as_view()),
    path('get_category/', GetCategory.as_view()),
    path('get_active_element/', GetActiveElement.as_view()),
    path('get_views/', GetView.as_view()),
    path('create_views/', CreateViews.as_view()),
    path('create_comment/', CreateComment.as_view()),
    path('delete_comment/', DeleteComment.as_view()),

]
