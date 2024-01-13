node -v
npm -v

python 3.10.11, postgres, pgadmin
python -m pip install Django
pip install django-cors-headers
pip install djangorestframework-jwt
pip install BeautifulSoup4
pip install pandas

Далее необходимые к установке пакеты находятся в package.json.

Запуск окружения и сервера:
.venv\Scripts\activate.bat
cd SmartPharmacy
python manage.py runserver

Моё:
cd C:\Users\Vlad\Documents\GitHub\.venv\Scripts
activate.bat
cd C:\Users\Vlad\Documents\GitHub\SmartPharmacy
python manage.py runserver

Задать переменные среды
set DATABASE_NAME="SmartPharmacy"
set DATABASE_USER="postgres"

Миграция:
python -m venv .venv
python manage.py migrate

Для отчета:
npm i @grapecity/activereports-react

чисти чисти говно
TRUNCATE TABLE
public."MainApp_activeingredients",
public."MainApp_category",
public."MainApp_chainqueue",
public."MainApp_comments",
public."MainApp_medicines",
public."MainApp_medicines_active_element",
public."MainApp_medicines_comment",
public."MainApp_symptoms",
public."MainApp_views",
public."MainApp_users"
RESTART IDENTITY cascade;


TRUNCATE TABLE
public."MainApp_medicines_active_element",
public."MainApp_category",
public."MainApp_activeingredients",
public."MainApp_medicines"
RESTART IDENTITY cascade;
