"""trefle URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from users.views import get_user_list
from register import views as v1
from profiles.views import get_leaders

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('bio/<int:UserData_id>', user_detail_view),
    path('allusers/', get_user_list),
    path('register/', v1.register, name="register"),
    path('', include("django.contrib.auth.urls")),
<<<<<<< HEAD
    #logout
    path("logout", v1.logout_request, name="logout"),
    #login
    path("login", v1.login_request, name="login"),
    path('allleaders/', get_leaders)
=======
>>>>>>> f770fe0749520f5bedebf9cfa59bf4a7ada9da21
    #  url(r'^api-auth/', include('rest_framework.urls')),
]