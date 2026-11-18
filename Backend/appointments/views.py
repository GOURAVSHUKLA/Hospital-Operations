from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .models import Appointment
from .serializers import AppointmentSerializer
from .permissions import AppointmentRolePermission

from notifications.models import Notification


class AppointmentViewSet(viewsets.ModelViewSet):

    serializer_class = AppointmentSerializer

    permission_classes = [
        IsAuthenticated,
        AppointmentRolePermission
    ]

    def get_queryset(self):

        user = self.request.user

        if user.role == 'ADMIN':
            return Appointment.objects.all()

        if user.role == 'PATIENT':
            return Appointment.objects.filter(
                patient__user=user
            )

        if user.role == 'DOCTOR':
            return Appointment.objects.filter(
                doctor__user=user
            )

        return Appointment.objects.none()

    # Notification helper
    def send_notification(self, appointment, title, message):

        recipients = [
            appointment.patient.user,
            appointment.doctor.user
        ]

        for recipient in recipients:

            Notification.objects.create(
                recipient=recipient,
                title=title,
                message=message,
                notification_type='appointment'
            )

    # Create appointment
    def perform_create(self, serializer):

        user = self.request.user

        if user.role == 'PATIENT':

            if not hasattr(user, 'patient_profile'):
                raise ValidationError(
                    "Patient profile not found. Please contact the administrator."
                )

            appointment = serializer.save(
                patient=user.patient_profile,
                status='PENDING'
            )

        else:
            appointment = serializer.save()

        self.send_notification(
            appointment,
            "New Appointment",
            f"Appointment scheduled for "
            f"{appointment.appointment_date} "
            f"at {appointment.appointment_time}. "
            f"Status: {appointment.status}"
        )

    # Update appointment
    
    def perform_update(self, serializer):

        old_instance = serializer.instance

        old_status = old_instance.status
        old_date = old_instance.appointment_date
        old_time = old_instance.appointment_time

        appointment = serializer.save()

        new_status = appointment.status

        if old_status != new_status:

            messages = {
                'PENDING': 'Your appointment is pending.',
                'CONFIRMED': 'Your appointment has been confirmed.',
                'COMPLETED': 'Your appointment has been completed.',
                'CANCELLED': 'Your appointment has been cancelled.'
            }

            message = messages.get(
                new_status,
                f"Appointment status changed to {new_status}."
            )

            title = "Appointment Status Updated"

        elif old_date != appointment.appointment_date or old_time != appointment.appointment_time:

            message = (
                f"Your appointment has been rescheduled to "
                f"{appointment.appointment_date} at "
                f"{appointment.appointment_time}."
            )

            title = "Appointment Rescheduled"

        else:
            return

        self.send_notification(
            appointment,
            title,
            message
        )