from bs4 import BeautifulSoup
import requests
from rest_framework.decorators import action
import re
from re import sub
from decimal import Decimal
import io
from datetime import datetime
import pandas as pd
from .models import ActiveIngredients, Category, Medicines


def Scrap():
    base_url = 'https://apteki.medsi.ru/'
    pr = []
    url = 'https://apteki.medsi.ru/health/lekarstva_i_bad/'
    #url = f'https://apteki.medsi.ru/mnn/'
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    ad = soup.find_all('a', class_='catalog-filter__list-link')
    for i in ad:
        category = Category.objects.create(name=i.get('title'))
        first_page = requests.get(base_url+i.get('href')).text
        first_pages = BeautifulSoup(first_page, 'lxml')
        product = first_pages.find_all('a', class_='product-list-item__title-link')

        for j in product:
            prod = requests.get(base_url + j.get('href')).text
            prod = BeautifulSoup(prod, 'lxml')
            pr.append(Medicines(name=prod.find('h1', class_='product-title').text,
                                category=category,
                                producer=prod.find('span', class_='product-prop').text,
                                total_amount=prod.find('span', class_='product-price mr-12').text,
                                ))

        count = 2
        while True:
            respon = requests.get(base_url+i.get('href')+f'?PAGEN_1={count}').text
            if respon == first_page:
                break
            resp = BeautifulSoup(respon, 'lxml')
            product = resp.find_all('a', class_='product-list-item__title-link')

            for j in product:
                prod = requests.get(base_url+j.get('href')).text
                prod = BeautifulSoup(prod, 'lxml')

    # ad = soup.find_all('a', class_='drug-list__link')
    # for i in ad:
    #     active.append(ActiveIngredients(name=i.get('title')))
    # ActiveIngredients.objects.bulk_create(active)
