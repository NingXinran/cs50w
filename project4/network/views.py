import json
from django.contrib.auth import authenticate, login, logout
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from datetime import datetime

from .models import User, Post


def index(request):
    if request.method == "POST":
        new_post = Post(
            user = request.user,
            body = request.POST["create_body"],
            time = datetime.now()
        )
        new_post.save()
        return HttpResponseRedirect(reverse("index"))
    else:
        return indexPaged(request, 1)

def indexPaged(request, page):
    allPosts = Post.objects.all().order_by('-time')
    paginator = Paginator(allPosts, 10)
    numPages = paginator.num_pages
    posts = paginator.page(page).object_list
    hasNext = page < numPages
    hasPrev = page != 1

    return render(request, "network/index.html", {
        "posts": posts,
        "hasNext": hasNext,
        "hasPrev": hasPrev,
        "nextPage": page + 1,
        "prevPage": page - 1
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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


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
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
    
def user_view(request, username, page):
    requestUser = request.user
    user = User.objects.get(username=username)
    followersCount = user.followers.all().count
    followingCount = user.following.all().count
    allPosts = Post.objects.filter(user = user).order_by('-time')
    paginator = Paginator(allPosts, 10)
    numPages = paginator.num_pages
    posts = paginator.page(page).object_list
    hasNext = page < numPages
    hasPrev = page != 1
    isFollowing = user in requestUser.following.all()
    return render(request, "network/user.html", {
        "requestUser": requestUser,
        "user": user,
        "followersCount": followersCount,
        "followingCount": followingCount,
        "posts": posts,
        "isFollowing": isFollowing,
        "hasNext": hasNext,
        "hasPrev": hasPrev,
        "nextPage": page + 1,
        "prevPage": page - 1
    })

def follow(request, username):
    requestUser = request.user
    userObject = User.objects.get(username=username)
    isFollowing = userObject in requestUser.following.all()
    if not isFollowing:
        print(f"you have requested to follow {username}.")
        requestUser.following.add(userObject)
        requestUser.save()
    else:
        print(f"you have requested to unfollow {username}.")
        requestUser.following.remove(userObject)
        requestUser.save()
    return HttpResponseRedirect(reverse("user", args=(username, 1)))

def following_view(request, page):
    allFollowing = request.user.following.all()
    allPosts = Post.objects.all()
    followingPosts = []
    for following in allFollowing:
        posts = allPosts.filter(user = following)
        for post in posts:
            followingPosts.append(post)
    followingPosts.sort(key=lambda x: x.time, reverse=True)

    if not followingPosts:
        return render(request, "network/following.html", {
            "followingPosts": followingPosts,
            "hasNext": False,
            "hasPrev": False,
            "nextPage": 0,
            "prevPage": 0
        })

    paginator = Paginator(followingPosts, 10)
    numPages = paginator.num_pages
    posts = paginator.page(page).object_list
    hasNext = page < numPages
    hasPrev = page != 1

    return render(request, "network/following.html", {
        "followingPosts": posts,
        "hasNext": hasNext,
        "hasPrev": hasPrev,
        "nextPage": page + 1,
        "prevPage": page - 1
    })

@csrf_exempt
def editPost(request, id):
    print("editPost")
    try:
        post = Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found.", "status": 404})

    if request.method == "PUT":
        data = json.loads(request.body)
        if data["attribute"] == "body" and data["body"] is not None:  # Edit function
            post.body = data["body"]
            post.save()
            return HttpResponse(status=204)
        elif data["attribute"] == "like":  # Like function
            # Check if user has already liked the post
            hasLiked = request.user in post.likes.all()
            if hasLiked:
                post.likes.remove(request.user)
                post.save()
            else:
                post.likes.add(request.user)
                post.save()
            return JsonResponse({
                "likes": str(post.likes.count())
            }, status=200)

