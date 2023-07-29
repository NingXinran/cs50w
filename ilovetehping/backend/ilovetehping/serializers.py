from rest_framework import serializers
from .models import User, Shop, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'favourites')

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('name', 'user', 'zipcode', 'address', 'latitude', 'longitude', 'image', 'description', 'price', 'timestamp')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('user', 'shop', 'timestamp', 'rating', 'body')