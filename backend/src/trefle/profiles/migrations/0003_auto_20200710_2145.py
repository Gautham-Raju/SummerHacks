# Generated by Django 3.0.7 on 2020-07-10 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20200710_2145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membership',
            name='leadership',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
