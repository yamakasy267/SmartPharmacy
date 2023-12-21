# Generated by Django 4.2.7 on 2023-12-21 09:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainApp', '0002_alter_medicines_release_form'),
    ]

    operations = [
        migrations.CreateModel(
            name='Requests',
            fields=[
                ('request_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('date', models.DateTimeField(default=datetime.datetime(2023, 12, 21, 12, 47, 4, 33770))),
                ('user', models.CharField(max_length=10000)),
                ('search_type', models.CharField()),
                ('response_code', models.IntegerField()),
                ('response_text', models.TextField(blank=True, max_length=10000, null=True)),
            ],
        ),
    ]