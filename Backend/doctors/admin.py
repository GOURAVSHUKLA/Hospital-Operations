from django.contrib import admin
from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'name',
        'email',
        'specialization',
        'experience',
        'consultation_fee',
        'is_available',
    )

    search_fields = ('name', 'email', 'specialization')

    list_filter = ('specialization', 'is_available')