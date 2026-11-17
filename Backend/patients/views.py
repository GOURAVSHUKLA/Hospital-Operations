from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Patient
from .serializers import PatientSerializer
from accounts.permissions import IsAdminRole


class PatientViewSet(viewsets.ModelViewSet):

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    permission_classes = [IsAuthenticated, IsAdminRole]

    def perform_create(self, serializer):
        serializer.save()