from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("add", views.add_view, name="add"),
    path("listing/<int:id>", views.listing, name="listing"),
    path("listing/close/<int:id>", views.close_listing, name="close"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("watchlist/<int:id>", views.watchlist_id, name="watchlist_id"),
    path("comment/<int:id>", views.add_comment, name="comment")
]
