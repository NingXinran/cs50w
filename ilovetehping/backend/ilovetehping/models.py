from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class User(AbstractUser):
    favourites = models.ManyToManyField("Shop", 
                                        related_name="favourited", 
                                        blank=True)

class Shop(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    zipcode = models.IntegerField(validators=[MinValueValidator(100000), MaxValueValidator(999999)], null=True, blank=True)
    address = models.TextField(null=True, blank=True)  # for user
    latitude = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)], null=True, blank=True)
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)], null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shop_{self.name}"

class Rating(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    shop = models.ForeignKey("Shop", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    body = models.TextField(blank=True)

    def __str__(self):
        return f"Rating_for_{self.shop}"
