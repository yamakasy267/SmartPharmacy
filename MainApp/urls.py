from django.urls import path, include
from .views import *
from .scrabing_pharmacy import Scrap
from django.urls import reverse

urlpatterns = [
    path('registration/', Registration.as_view()),
    path('login/', Auntification.as_view()),
    path('scrap/', TestScrap.as_view()),
    path('get_medicine/', GetMedicine.as_view()),
    path('get_medicine_by_element/', GetMedicineForActiveElement.as_view()),
    path('get_medicine_by_name/', GetMedicineForName.as_view()),
    path('get_medicine_by_category/', GetMedicineForCategory.as_view()),
    path('get_category/', GetCategory.as_view()),
    path('get_active_element/', GetActiveElement.as_view()),
    path('get_favorites/', GetFavorites.as_view()),
    path('delete_favorite/', DeleteFavorites.as_view()),
    path('create_favorite/', CreateFavorites.as_view()),
    path('create_comment/', CreateComment.as_view()),
    path('delete_comment/', DeleteComment.as_view()),
    path('get_logs/', GetLogs.as_view()),
    path('get_user_info/', GetUserInfo.as_view()),
    path('get_all_users_info/', GetAllUsersInfo.as_view()),
    path('delete_user/', DeleteUser.as_view()),
    path('update_user_info/', UpdateInfoUser.as_view()),
]
