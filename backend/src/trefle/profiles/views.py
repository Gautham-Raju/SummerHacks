from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Profile, Group, Membership
from .serializers import MembershipSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
# def user_promotion_view(request, profile_id, group_id, **kwargs, *args):
#     p1 = Profile.objects.filter(id = profile_id)
#     if not p1.exists():
#         return Response({}, status = 404)
#     g1 = Group.objects.filter(id = group_id)
#     if not g1.exists():
#         return Response({}, status = 404)
#     m1 = Membership.objects.filter(group = g1, profile = p1)
#     if not m1.exists():
#         return Response({}, status = 404)
#     obj = m1.first()
#     obj.leadership = True
#     return Response({"message": "User promoted"}, status = 200)

def get_leaders(request):
    if request.method == "GET":
        leaders_list = Membership.objects.filter(leadership=True)
        serializer = MembershipSerializer(leaders_list, many=True)
        return JsonResponse(serializer.data, safe=False)

