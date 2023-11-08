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
    role = models.ForeignKey(Roles, on_delete=models.PROTECT, default=Roles.objects.get(name='User').pk)


class Comments(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.PROTECT)
    text = models.TextField(max_length=10000)


class Medicines(models.Model):
    med_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    active_element = models.ManyToManyField('MainApp.ActiveIngredients', related_name='active_element')
    producer = models.CharField(max_length=1000)
    total_amount = models.FloatField(max_length=100000)
    release_form = models.IntegerField()
    quantity = models.IntegerField()
    comment = models.ManyToManyField('MainApp.Comments', related_name='comments')


class Views(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.PROTECT)
    medicine_id = models.ForeignKey(Medicines, on_delete=models.PROTECT)
