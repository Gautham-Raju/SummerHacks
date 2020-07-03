from django.contrib import admin

# Register your models here.
from .models import UserData, ClubData, UserClub

admin.site.register(UserData)
admin.site.register(ClubData)
admin.site.register(UserClub)