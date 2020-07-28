from rest_framework import serializers
from profiles.models import Profile, Group, Membership

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('leadership', 'role')