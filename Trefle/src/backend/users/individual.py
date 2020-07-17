from .models import UserData
from .models import UserClub
# import importlib
# importlib.import_module .models
# pmname = .models

class Individual():
    def __init__(self, UserData, UserClub):
        clubs = UserClub.objects.filter(user__name='Raju Kakarlapudi')
        for x in clubs:
            print(x.school)
        

