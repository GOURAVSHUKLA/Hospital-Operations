from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsAdminRole

from .models import Room, Bed
from .serializers import RoomSerializer, BedSerializer


class RoomViewSet(viewsets.ModelViewSet):

    queryset = Room.objects.all().order_by('room_number')

    serializer_class = RoomSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminRole
    ]


class BedViewSet(viewsets.ModelViewSet):

    queryset = Bed.objects.select_related('room').all()

    serializer_class = BedSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminRole
    ]