from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    picture = models.FileField(upload_to= 'users/images', blank=True, null = True)
    school = models.CharField(default= "", max_length = 100)
    year = models.BigIntegerField(null=True, blank=True)

    #notifications
    announcements = models.BooleanField(default= True)
    election_start = models.BooleanField(default= True)
    election_creation = models.BooleanField(default= True)
    election_end = models.BooleanField(default= True)
    communication_message = models.BooleanField(default= True)
    communication_group = models.BooleanField(default= True)
    calendar = models.BooleanField(default= True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()