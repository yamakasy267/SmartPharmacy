#!/usr/bin/env sh
cd ./service || exit 1

echo 'Applying migrations'
python3 manage.py migrate
