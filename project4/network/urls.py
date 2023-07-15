
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:page>", views.indexPaged, name="indexPaged"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("users/<str:username>", views.user_view, name="user"),
    path("follow/<str:username>", views.follow, name="follow"),
    path("following/<int:page>", views.following_view, name="following"),
    path("posts/<int:id>", views.editPost, name="editPost")
]
