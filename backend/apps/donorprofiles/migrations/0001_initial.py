# Generated by Django 3.0.3 on 2020-07-15 11:47

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DonorProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(blank=True, max_length=50)),
                ('first_name', models.CharField(blank=True, max_length=100)),
                ('last_name', models.CharField(blank=True, max_length=100)),
                ('country', django_countries.fields.CountryField(blank=True, max_length=2)),
                ('zip_code', models.CharField(blank=True, max_length=100)),
                ('street', models.CharField(blank=True, max_length=100)),
                ('avatar', models.ImageField(blank=True, upload_to='')),
                ('birthday', models.DateField(blank=True, null=True)),
                ('last_donation', models.DateField(blank=True, null=True)),
                ('total_points', models.IntegerField(blank=True, default=0)),
                ('blood_group', models.CharField(choices=[('O', 'O'), ('O+', 'O+'), ('A-', 'A-'), ('A+', 'A+'), ('B-', 'B-'), ('B+', 'B+'), ('AB-', 'AB-'), ('AB+', 'AB+')], default='O-', max_length=3)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('0', 'other')], default='M', max_length=2)),
            ],
        ),
    ]
