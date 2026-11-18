from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'name',
        'email',
        'phone',
        'designation',
        'department',
        'salary',
        'joining_date',
        'is_active',
    )

    list_filter = (
        'department',
        'designation',
        'is_active',
    )

    search_fields = (
        'name',
        'email',
        'phone',
    )

    ordering = ('-joining_date',)