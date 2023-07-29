from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, ShopSerializer, RatingSerializer
from .models import User, Shop, Rating

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ShopView(viewsets.ModelViewSet):
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()
