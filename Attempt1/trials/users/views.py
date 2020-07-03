from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import UserData

#testing
def user_detail_view(request, UserData_id, *args, **kwargs):
    """
    REST API VIEW
    Consumed by JavaScript
    return json data
    """
    data = {
        "id": UserData_id,
        # "image_path": obj.picture.url
    }
    status = 200
    try:
        obj = UserData.objects.get(id=UserData_id)
        data['name'] = obj.name
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data, status=status)

