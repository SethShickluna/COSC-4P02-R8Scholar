# Generated by Django 3.1.5 on 2021-02-14 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('r8scholar', '0011_auto_20210207_2111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='rating',
            field=models.FloatField(default=None, null=True),
        ),
    ]