from rest_framework import serializers
from django.utils import timezone

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['created_at']

        extra_kwargs = {
            'patient': {'required': False}
        }

    def get_fields(self):

        fields = super().get_fields()

        request = self.context.get('request')

        if request and request.user.role == 'PATIENT':

            fields['patient'].read_only = True
            fields['status'].read_only = True

        return fields

    def validate(self, data):

        patient = data.get(
            'patient',
            getattr(self.instance, 'patient', None)
        )

        doctor = data.get(
            'doctor',
            getattr(self.instance, 'doctor', None)
        )

        appointment_date = data.get(
            'appointment_date',
            getattr(self.instance, 'appointment_date', None)
        )

        appointment_time = data.get(
            'appointment_time',
            getattr(self.instance, 'appointment_time', None)
        )

        status = data.get(
            'status',
            getattr(self.instance, 'status', 'PENDING')
        )

        request = self.context.get('request')

        # ADMIN must select a patient
        if request and request.user.role == 'ADMIN' and not patient:
            raise serializers.ValidationError(
                "Please select a patient."
            )

        # Prevent past appointments
        if appointment_date and appointment_date < timezone.localdate():
            raise serializers.ValidationError(
                "Appointment date cannot be in the past."
            )

        # Check doctor availability
        if doctor and not doctor.is_available:
            raise serializers.ValidationError(
                "This doctor is currently unavailable."
            )

        if (
            doctor and patient and appointment_date
            and appointment_time and status != 'CANCELLED'
        ):

            existing = Appointment.objects.filter(
                doctor=doctor,
                appointment_date=appointment_date,
                appointment_time=appointment_time
            ).exclude(status='CANCELLED')

            if self.instance:
                existing = existing.exclude(pk=self.instance.pk)

            if existing.exists():
                raise serializers.ValidationError(
                    "This doctor already has an appointment at this time."
                )

            patient_existing = Appointment.objects.filter(
                patient=patient,
                appointment_date=appointment_date,
                appointment_time=appointment_time
            ).exclude(status='CANCELLED')

            if self.instance:
                patient_existing = patient_existing.exclude(
                    pk=self.instance.pk
                )

            if patient_existing.exists():
                raise serializers.ValidationError(
                    "This patient already has an appointment at this time."
                )

        return data