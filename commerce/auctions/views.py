from datetime import datetime
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from .models import User, Listing, Comment, Bid, Category


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.all()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

def add_view(request):
    if request.method == "POST":
        initial_bid = Bid(
            amount = request.POST["add_listing_starting_bid"],
            user = request.user
        )
        initial_bid.save()
        listing = Listing(
            title = request.POST["add_listing_title"],
            description = request.POST["add_listing_description"],
            bid = initial_bid,
            image = request.POST["add_listing_image_url"] if request.POST["add_listing_image_url"] else None,
            category = Category.objects.get(name=request.POST["add_listing_category"]) if "add_listing_category" in request.POST else None,
            user = request.user,
            is_open = True
        )
        listing.save()
        return HttpResponseRedirect(reverse("index"))
    return render(request, "auctions/add.html", {
        "categories": Category.objects.all()
    })

def listing(request, id):
    ls = Listing.objects.get(id=id)
    comments = Comment.objects.filter(listing=ls)

    if request.method == "POST":
        amount = float(request.POST["new_bid_amount"])
        current_amount = ls.bid.amount

        if amount > current_amount:
            new_bid = Bid(
                amount = request.POST["new_bid_amount"],
                user = request.user
            )
            new_bid.save()
            ls.bid = new_bid
            ls.save()
            return render(request, "auctions/listing.html", {
                "ls": ls,
                "user": request.user,
                "watchlist_listings": request.user.watchlist_listings.all() if request.user.is_authenticated else None,
                "comments": comments,
                "success_msg": "Bid successfully placed!"
            })
        else:
            return render(request, "auctions/listing.html", {
                "ls": ls,
                "user": request.user,
                "watchlist_listings": request.user.watchlist_listings.all() if request.user.is_authenticated else None,
                "comments": comments,
                "error_msg": "Please ensure that your bidding value is strictly greater than the current value!"
            })
    
    
    return render(request, "auctions/listing.html", {
        "ls": ls,
        "user": request.user,
        "watchlist_listings": request.user.watchlist_listings.all() if request.user.is_authenticated else None,
        "comments": comments
    })

def close_listing(request, id):
    ls = Listing.objects.get(id=id)
    ls.is_open = False
    ls.save()

    return HttpResponseRedirect(reverse('listing', args=(ls.id,)))

def watchlist(request):
    listings = request.user.watchlist_listings.all()
    return render(request, "auctions/watchlist.html", {
        "listings": listings
    })

def watchlist_id(request, id):
    ls = Listing.objects.get(id=id)
    user = request.user
    if ls in user.watchlist_listings.all():
        user.watchlist_listings.remove(ls)
    else:
        user.watchlist_listings.add(ls)
    user.save()
    return HttpResponseRedirect(reverse("listing", args=(ls.id,)))

def add_comment(request, id):
    ls = Listing.objects.get(id=id)
    if request.method == "POST":
        comment = Comment(
            title=request.POST["comment_title"],
            text=request.POST["comment_body"],
            user=request.user,
            listing=ls,
            time=datetime.now()
        )
        comment.save()
        return HttpResponseRedirect(reverse("listing", args=(ls.id,)))
    
def categories(request):
    categories = Category.objects.all()
    for category in categories:
        count = Listing.objects.filter(category=category).filter(is_open=True).count()
        category.count = count
        category.save()
    return render(request, "auctions/categories.html", {
        "categories": categories
    })

def category(request, name):
    category = Category.objects.get(name=name)
    listings = Listing.objects.filter(category=category)
    return render(request, "auctions/category.html", {
        "listings": listings
    })