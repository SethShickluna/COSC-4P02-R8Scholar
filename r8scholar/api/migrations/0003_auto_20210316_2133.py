# Generated by Django 3.1.5 on 2021-03-16 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210309_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='verification_code',
            field=models.CharField(default='I64YIR', max_length=10),
        ),
    ]
