from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers = models.ManyToManyField('self',
                                        symmetrical = False,
                                        blank=True, 
                                        related_name='following')

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    time = models.DateTimeField()
    likes = models.ManyToManyField(User,
                                   blank=True,
                                   related_name='liked')
    
    def __str__(self):
        return f"Post from {self.user.username}: {self.body[:20]}"