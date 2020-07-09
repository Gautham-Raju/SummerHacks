from django.db import models

# Create your models here.
class UserData(models.Model):
    #userID =  models.AutoField(primary_key=True)
    picture = models.FileField(upload_to= 'users/images', blank=True, null = True)
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

    def __str__(self):
        return self.name
