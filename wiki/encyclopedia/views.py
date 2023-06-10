from django import forms
from django.contrib import messages
from django.shortcuts import render, redirect
import random

from . import util
from markdown2 import Markdown

markdowner = Markdown()

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def entry(request, name):
    print('ENTRY METHOD...')
    entry_md = util.get_entry(name)
    if entry_md is not None:
        return render(request, f"encyclopedia/entry.html", {
            "entry_title": name,
            "entry_content": markdowner.convert(util.get_entry(name))
        })
    else:
        return render(request, "encyclopedia/error.html")
    
def search(request):
    if request.method == "POST":
        search_term = request.POST.get("search_term")
        all_entries = util.list_entries()
        possible_entries = []
        for e in all_entries:
            if search_term.upper() == e.upper():
                return entry(request, e)
            elif search_term.upper() in e.upper():
                possible_entries.append(e)
        print(possible_entries)
        return render(request, "encyclopedia/search_results.html", {
                    "possible_entries": possible_entries
                })

    
def new_entry(request):
    if request.method == "POST":
        # check if title exists, create error message if yes
        title = request.POST.get("entry_title")
        content = request.POST.get("entry_content")
        print(f'title: {title}')
        print(f'content: {content}')
        titles = util.list_entries()
        if title.capitalize() in titles:
            messages.error(request, "Entry title is already taken!")
            return render(request, "encyclopedia/new_entry.html", {
                'title': title,
                'content': content
            })
        else:
            util.save_entry(request.POST.get("entry_title"), request.POST.get("entry_content"))
            return redirect(f"wiki/{title}")
        
    
    return render(request, "encyclopedia/new_entry.html")

def edit_entry(request, name):
    if request.method == "POST":
        util.save_entry(name, request.POST.get("entry_content"))
        return entry(request, name)
    
    entry_md = util.get_entry(name)
    print(entry_md)
    if entry_md is not None:
        return render(request, f"encyclopedia/edit_entry.html", {
            "entry_title": name,
            "entry_content": entry_md
        })
    else:
        return render(request, "encyclopedia/error.html")

def random_entry(request):
    entry_random = random.choice(util.list_entries())
    return redirect(f"wiki/{entry_random}")
