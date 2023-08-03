from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, ShopSerializer
from .models import User, Shop

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ShopView(viewsets.ModelViewSet):
    serializer_class = ShopSerializer
    queryset = Shop.objects.all()