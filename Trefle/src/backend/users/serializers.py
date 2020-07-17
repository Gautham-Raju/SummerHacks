from rest_framework import serializers
from users.models import UserData

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('name', 'location', 'school', 'year', 'biography')
        


