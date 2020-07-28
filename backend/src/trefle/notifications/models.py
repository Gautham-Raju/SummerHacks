from django.db import models
from django.conf import settings
from django.urls import reverse
from django.contrib.auth.models import User 
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Announcement(models.Model):
    title = models.CharField(_("title"), max_length=50)
    content = models.TextField(_("content"))
    attachment = models.FileField(upload_to= 'users/images', blank=True, null=True)
    creator = models.ForeignKey(
        User,
        verbose_name=_("creator"),
        on_delete=models.CASCADE
    )
    site_wide = models.BooleanField(_("site wide"), default=False)
    members_only = models.BooleanField(_("members only"), default=False)
    publish_start = models.DateTimeField(_("publish_start"), default=timezone.now)
    publish_end = models.DateTimeField(_("publish_end"), blank=True, null=True)

def __str__(self):
    return self.title

def get_absolute_url(self):
    return reverse("pinax_announcements:announcement_detail", args=[self.pk])

class Meta:
    verbose_name = _("announcement")
    verbose_name_plural = _("announcements")