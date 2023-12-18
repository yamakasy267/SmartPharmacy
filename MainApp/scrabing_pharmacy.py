from bs4 import BeautifulSoup
import requests
from rest_framework.decorators import action
from selenium import webdriver
from selenium.webdriver.common.by import By

def Scrap():
    url = 'https://ozerki.ru/sankt-peterburg/catalog/product/geksoral-tab-d-rassas-20-1/'

    driver = webdriver.Chrome()
    driver.get(url)
    elem = driver.find_element(By.CLASS_NAME, 'sc-4a528871-0 eypOQs sc-26319833-5 fbWwJr')
    #print(elem)
