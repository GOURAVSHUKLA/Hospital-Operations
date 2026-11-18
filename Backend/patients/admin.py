from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'user',
        'date_of_birth',
        'gender',
        'blood_group',
        'emergency_contact',
        'registration_date',
    )

    search_fields = (
        'user__username',
        'user__email',
        'emergency_contact',
    )

    list_filter = (
        'gender',
        'blood_group',
    )