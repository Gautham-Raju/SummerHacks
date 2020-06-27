from django.db import models

# Create your models here.
class UserData(models.Model):
    #userID =  models.BigIntegerField()
    #picture = models.ImageField()
    name = models.CharField(max_length = 100)
    #email = models.EmailField(max_length = 254)
    location = models.CharField(max_length = 100)
    school = models.CharField(max_length = 100)
    year = models.BigIntegerField()
    biography = models.CharField(max_length = 350)
    club_membership = [1, 2]

    #notifications
    announcements = models.BooleanField(null = True)
    election_start = models.BooleanField(null = True)
    election_creation = models.BooleanField(null = True)
    election_end = models.BooleanField(null = True)
    communication_message = models.BooleanField(null = True)
    communication_group = models.BooleanField(null = True)
    calendar = models.BooleanField(null = True)

class ClubData(models.Model):
    #clubName = models.CharField(max_length = 100)
    #clubID = models.BigIntegerField()
    #picture = models.ImageField()
    #color = models.
    president = models.CharField(max_length = 100)
    vpresident = models.CharField(max_length = 100)
    treasurer = models.CharField(max_length = 100)
    secretary = models.CharField(max_length = 100)

class UserClub(models.Model):
    user = models.ForeignKey('UserData', on_delete=models.CASCADE)
    club = models.ForeignKey('ClubData', on_delete=models.CASCADE)
    isAdmin = models.BooleanField(null = True)
