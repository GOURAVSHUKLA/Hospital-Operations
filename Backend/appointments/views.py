from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Appointment
from .serializers import AppointmentSerializer
from .permissions import AppointmentRolePermission


class AppointmentViewSet(viewsets.ModelViewSet):

    serializer_class = AppointmentSerializer

    permission_classes = [
        IsAuthenticated,
        AppointmentRolePermission
    ]

    def get_queryset(self):

        user = self.request.user

        # ADMIN can see all appointments
        if user.role == 'ADMIN':
            return Appointment.objects.all()

        # PATIENT can see only their appointments
        if user.role == 'PATIENT':
            return Appointment.objects.filter(
                patient__user=user
            )

        # DOCTOR can see only their appointments
        if user.role == 'DOCTOR':
            return Appointment.objects.filter(
                doctor__user=user
            )

        return Appointment.objects.none()

    def perform_create(self, serializer):

        user = self.request.user

        # PATIENT appointment creation
        if user.role == 'PATIENT':

            if not hasattr(user, 'patient_profile'):
                raise ValidationError(
                    "Patient profile not found. Please contact the administrator."
                )

            serializer.save(
                patient=user.patient_profile,
                status='PENDING'
            )

        else:
            serializer.save()