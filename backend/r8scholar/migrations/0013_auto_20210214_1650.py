# Generated by Django 3.1.5 on 2021-02-14 16:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('r8scholar', '0012_auto_20210214_1643'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='instructor',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='r8scholar.instructor'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='reviews',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='r8scholar.review'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='forum_posts',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='r8scholar.forum'),
        ),
    ]
