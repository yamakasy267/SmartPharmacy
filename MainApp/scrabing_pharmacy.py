from bs4 import BeautifulSoup
import requests
from rest_framework.decorators import action
import re
from re import sub
from decimal import Decimal
import io
from datetime import datetime
from .models import ActiveIngredients, Category, Medicines


def Scrap():
    base_url = 'https://apteki.medsi.ru/'
    url = f'https://apteki.medsi.ru/mnn/'
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    ad = soup.find_all('a', class_='drug-list__link')
    for i in ad:
        mudl = i.get('title').split(' + ')
        for j in mudl:
            ActiveIngredients.objects.get_or_create(name=j.strip().lstrip('[').rstrip(']'))
    url = 'https://apteki.medsi.ru/health/lekarstva_i_bad/'

    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    ad = soup.find_all('a', class_='catalog-filter__list-link')
    for i in ad:
        category, created = Category.objects.get_or_create(name=i.get('title'))
        # if not created:
        #     continue
        first_page = requests.get(base_url + i.get('href')).text
        first_pages = BeautifulSoup(first_page, 'lxml')
        product = first_pages.find_all('a', class_='product-list-item__title-link')
        for j in product:
            prod = requests.get(base_url + j.get('href'))
            if prod.status_code != 200:
                continue
            prod = BeautifulSoup(prod.text, 'lxml')
            amount = prod.find('span', class_='product-price mr-12').text.split()[:-1]
            amount = "".join(amount)
            image = prod.find('div', class_='product-image-slider-item').find_next('a').get('href')
            image = base_url + image
            ingredient = prod.find('a', class_='anchor')
            producer = prod.find('span', class_='product-prop')
            while producer:
                if producer.find_next('span').text == "Производитель —":
                    producer = producer.contents[2].strip()
                    break
                producer = producer.find_next('span', class_='product-prop')
            if not producer:
                continue
            med = Medicines.objects.create(name=prod.find('h1', class_='product-title').text,
                                           category=category,
                                           producer=producer,
                                           total_amount=int(amount),
                                           release_form=prod.find('div', id='product-description').find('h3',
                                                                                                        class_='h5').find_next(
                                               'p').text,
                                           quantity=1,
                                           image=image)
            try:
                testing = ingredient.text.split(' + ')
                for o in range(len(testing)):
                    testing[o] = testing[o].strip().rstrip(']').lstrip('[')
                active = ActiveIngredients.objects.filter(name__in=testing).values('pk')
                med.active_element.set([lop['pk'] for lop in active])
            except Exception as e:
                print(e)
                print("Not category")
