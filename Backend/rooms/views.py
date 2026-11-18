from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

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

    def destroy(self, request, *args, **kwargs):

        room = self.get_object()

        if room.status == 'OCCUPIED':
            raise ValidationError(
                "Cannot delete an occupied room."
            )

        if room.beds.filter(status='OCCUPIED').exists():
            raise ValidationError(
                "Cannot delete a room containing occupied beds."
            )

        return super().destroy(request, *args, **kwargs)


class BedViewSet(viewsets.ModelViewSet):

    queryset = Bed.objects.select_related('room').all()

    serializer_class = BedSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminRole
    ]

    def destroy(self, request, *args, **kwargs):

        bed = self.get_object()

        if bed.status == 'OCCUPIED':
            raise ValidationError(
                "Cannot delete an occupied bed."
            )

        return super().destroy(request, *args, **kwargs)