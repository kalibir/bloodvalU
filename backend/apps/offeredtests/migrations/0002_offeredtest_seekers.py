# Generated by Django 3.0.3 on 2020-07-16 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('offeredtests', '0001_initial'),
        ('seekerprofiles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='offeredtest',
            name='seekers',
            field=models.ManyToManyField(blank=True, related_name='offered_tests', to='seekerprofiles.SeekerProfile'),
        ),
    ]
