from django.shortcuts import render
from .models import User, Shop, Rating

def index(request):
    return render(request, "ilovetehping/index.html")