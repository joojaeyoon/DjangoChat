# Generated by Django 2.2.10 on 2020-02-24 05:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='profile',
        ),
        migrations.AddField(
            model_name='message',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='message', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
