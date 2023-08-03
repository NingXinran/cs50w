# Generated by Django 4.2.3 on 2023-08-03 15:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ilovetehping', '0003_remove_shop_image_remove_shop_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='price',
            field=models.IntegerField(default=3.5, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
            preserve_default=False,
        ),
    ]
