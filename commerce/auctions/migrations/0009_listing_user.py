# Generated by Django 4.2.1 on 2023-06-25 12:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0008_alter_listing_bid'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
