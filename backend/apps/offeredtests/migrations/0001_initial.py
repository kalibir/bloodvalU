# Generated by Django 3.0.3 on 2020-07-17 07:07

import apps.registrations.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('donorprofiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OfferedTest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_type', models.CharField(max_length=150)),
                ('points_cost', models.IntegerField()),
                ('secret_code', models.CharField(default=apps.registrations.models.code_generator, max_length=5)),
                ('created', models.DateTimeField(auto_now=True)),
                ('expiry_date', models.DateField()),
                ('donors_who_bought', models.ManyToManyField(blank=True, related_name='bought_tests', to='donorprofiles.DonorProfile')),
            ],
        ),
    ]
