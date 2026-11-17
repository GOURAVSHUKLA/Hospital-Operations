from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Employee
from .serializers import EmployeeSerializer
from accounts.permissions import IsAdminRole


class EmployeeViewSet(viewsets.ModelViewSet):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    permission_classes = [IsAuthenticated, IsAdminRole]