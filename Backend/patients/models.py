from django.db import models
from django.conf import settings


class Patient(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='patient_profile'
    )

    date_of_birth = models.DateField(null=True, blank=True)

    gender = models.CharField(max_length=10, null=True, blank=True)

    blood_group = models.CharField(max_length=5, null=True, blank=True)

    address = models.TextField(null=True, blank=True)

    emergency_contact = models.CharField(
        max_length=15,
        null=True,
        blank=True
    )

    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username if self.user else f"Patient {self.id}"