from .models import GroupData as gData
import array as dhruv

class Group():
     #gData, name, color, image, 
    def __init__(self, gData, name, color, image):
        self.president = gData.president
        self.vpresident = gData.vpresident
        self.treasurer = gData.treasurer
        self.secretary = gData.secretary
        self.name = name
        self.color = color
        self.image = image
    
    def createAnnouncement(self, speaker, quote):
        for x in dhruv:
            x.receiveAnnouncement(speaker.name, quote)


        

