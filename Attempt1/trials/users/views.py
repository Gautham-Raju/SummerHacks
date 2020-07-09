from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import UserData
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt

# #testing
# def user_detail_view(request, UserData_id, *args, **kwargs):
#     """
#     REST API VIEW
#     Consumed by JavaScript
#     return json data
#     """
#     data = {
#         "id": UserData_id,
#         # "image_path": obj.picture.url
#     }
#     status = 200
#     try:
#         obj = UserData.objects.get(id=UserData_id)
#         data['name'] = obj.name
#     except:
#         data['message'] = "Not found"
#         status = 404
#     return JsonResponse(data, status=status)

def index(request):
    user_list = UserData.objects
    context = {'user_list': user_list}
    return render(request, 'templates/index.html', context)

def get_user_list(request):
    """
    Returns Json list of all restaurants
    """
    if request.method == "GET":
        user_list = UserData.objects
        serializer = UserSerializer(user_list, many=True)
        return JsonResponse(serializer.data, safe=False)

