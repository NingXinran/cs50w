from django.urls import path

from . import views

app_name = "encyclopedia"
urlpatterns = [
    path("", views.index, name="index"),
    path("/", views.random_entry, name="random"),
    path("wiki/<str:name>", views.entry, name="entry"),
    path("search_results", views.search, name="search"),
    path("new_entry", views.new_entry, name="new"),
    path("wiki/edit_entry/<str:name>", views.edit_entry, name="edit")
]
