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

class Group(models.Model):
    name = models.CharField(max_length=128)
    clubtag = models.CharField(max_length = 10, blank= True, null=True)
    picture = models.FileField(upload_to= 'users/images', blank=True, null=True)
    description = models.TextField(max_length=500, blank=True)
    members = models.ManyToManyField(
        Profile,
        through='Membership',
        through_fields=('group', 'profile')
    )

class Membership(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    leadership = models.BooleanField(default= False)
    role = models.CharField(max_length = 20, blank=True)
    inviter = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="membership_invites",
    )

class Announcement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    content = models.TextField(max_length=500, blank=True)
    attachment = models.FileField(upload_to= 'users/images', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    candidate = models.ForeignKey("Candidate", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Candidate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey("Position", blank=True, null=True, on_delete=models.CASCADE)
    votes = models.ManyToManyField(User, related_name= 'candidate_user', blank=True, through=Vote)
    #candidate platform
    bio = models.TextField(max_length=500, blank=True)

class Position(models.Model):
    election = models.ForeignKey("Election", blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True)
    candidates = models.ManyToManyField(User, related_name= 'position_user', blank= True, through=Candidate)

    def __str__(self):
        return self.name

class Election(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    starttime = models.DateTimeField()
    endtime = models.DateTimeField()
    # positions = models.ManyToManyField(Position, related_name= 'election_position', blank= True, through=Position)