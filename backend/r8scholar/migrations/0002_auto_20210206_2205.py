# Generated by Django 3.1.5 on 2021-02-06 22:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('r8scholar', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='reviews',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='r8scholar.review'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_id', models.IntegerField()),
                ('review_id', models.IntegerField()),
                ('name', models.CharField(max_length=20)),
                ('content', models.TextField()),
                ('date', models.DateTimeField()),
                ('numb_reports', models.IntegerField()),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='r8scholar.comment')),
            ],
        ),
        migrations.AddField(
            model_name='customuser',
            name='comments',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='r8scholar.comment'),
        ),
        migrations.AddConstraint(
            model_name='comment',
            constraint=models.UniqueConstraint(fields=('comment_id', 'review_id'), name='comment_key'),
        ),
    ]