#!/bin/sh

cd ./service || exit 1

python3 ./manage.py collectstatic --no-input

exec ~/.venv/bin/gunicorn -k uvicorn.workers.UvicornWorker service.asgi:application \
   --bind 0.0.0.0:8000 \
   --log-level=info \
   --error-logfile=- \
   --access-logfile=- \
"$@"
