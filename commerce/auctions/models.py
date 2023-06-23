from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Listing(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    bid = models.IntegerField()
    image = models.URLField()
    category = models.CharField(max_length=64)

    def __str__(self):
        return f"Listing: {self.title}"        

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)

    def __str__(self):
        return f"Comment from {self.user.username}: {self.text[:20]}"