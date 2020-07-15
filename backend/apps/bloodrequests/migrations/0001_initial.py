# Generated by Django 3.0.3 on 2020-07-15 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BloodRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('OP', 'Open'), ('CL', 'Closed'), ('COM', 'Completed')], default='OPEN', max_length=4)),
                ('blood_group', models.CharField(choices=[('O', 'O'), ('O+', 'O+'), ('A-', 'A-'), ('A+', 'A+'), ('B-', 'B-'), ('B+', 'B+'), ('AB-', 'AB-'), ('AB+', 'AB+')], default='O-', max_length=4)),
                ('is_for_covid', models.BooleanField(default=False)),
                ('is_urgent', models.BooleanField(default=False)),
                ('is_renewable', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
