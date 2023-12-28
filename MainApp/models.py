import datetime

from django.db import models


# Create your models here.

class Roles(models.Model):
    name = models.CharField(max_length=1000, db_index=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=1000, db_index=True)

    def __str__(self):
        return self.name


class ActiveIngredients(models.Model):
    name = models.CharField(max_length=1000, db_index=True)

    def __str__(self):
        return self.name


class Users(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    password = models.CharField(max_length=10000)
    email = models.EmailField(max_length=1000)
    date_of_birth = models.DateField()
    role = models.ForeignKey(Roles, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Comments(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.PROTECT)
    text = models.TextField(max_length=10000)
    date = models.DateTimeField(default=datetime.datetime.now())


class Medicines(models.Model):
    med_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    active_element = models.ManyToManyField('MainApp.ActiveIngredients', related_name='active_element')
    producer = models.CharField(max_length=1000)
    total_amount = models.FloatField(max_length=100000)
    release_form = models.CharField(max_length=1000)
    quantity = models.IntegerField()
    comment = models.ManyToManyField('MainApp.Comments', related_name='comments')
    image = models.URLField(null=True, blank=True)


class Views(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.PROTECT)
    medicine_id = models.ForeignKey(Medicines, on_delete=models.PROTECT)


class Requests(models.Model):
    request_id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField(default=datetime.datetime.now())
    user = models.CharField(max_length=10000)
    search_type = models.CharField()
    response_code = models.IntegerField()
    response_text = models.TextField(max_length=10000, blank=True, null=True)


class Symptoms(models.Model):
    symptoms_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)


class ChainQueue(models.Model):
    symptoms = models.CharField(max_length=1000)
    moderator = models.ForeignKey(Users, on_delete=models.CASCADE)
