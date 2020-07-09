from django import forms
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    email = forms.EmailField()
    # picture = forms.FileField(upload_to= 'users/images', blank=True, null=True)
    # school = forms.CharField(max_length = 100)
    # year = forms.BigIntegerField()
 # he
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]
