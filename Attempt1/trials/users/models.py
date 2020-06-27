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

    #notifications
    announcements = models.BooleanField()
    election_start = models.BooleanField()
    election_creation = models.BooleanField()
    election_end = models.BooleanField()
    communication_message = models.BooleanField()
    communicatoin_group = models.BooleanField()
    calendar = models.BooleanField()