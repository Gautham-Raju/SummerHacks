from django.db import models

# Create your models here.
class UserData(models.Model):
    #profilePic = 
    name = models.CharField(max_length = 100)
    #email =
    location = models.CharField(max_length = 100)
    school = models.CharField(max_length = 100)
    year = models.BigIntegerField()
    biography = models.CharField(max_length = 350)

