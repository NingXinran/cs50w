# Generated by Django 4.2.1 on 2023-07-15 05:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_remove_post_likes_delete_like_post_likes'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
