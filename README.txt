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