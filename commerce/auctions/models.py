from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Bid(models.Model):
    amount = models.DecimalField(decimal_places=2, max_digits=6)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"${self.amount} by {self.user}"
    
class Category(models.Model):
    name = models.CharField(max_length=64)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Listing(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    bid = models.OneToOneField(Bid, on_delete=models.CASCADE)
    image = models.URLField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    is_open = models.BooleanField()
    watchlist = models.ManyToManyField(User, related_name="watchlist_listings", null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"Listing: {self.title}"        

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    text = models.TextField()
    time = models.DateTimeField()

    def __str__(self):
        return f"Comment from {self.user.username}: {self.text[:20]}"
    
