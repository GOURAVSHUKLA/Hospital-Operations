from django.contrib import admin
from .models import Room, Bed


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'room_number',
        'room_type',
        'floor',
        'room_charges',
        'status',
        'total_beds',
    )

    list_filter = (
        'room_type',
        'status',
        'floor',
    )

    search_fields = ('room_number',)

    ordering = ('room_number',)


@admin.register(Bed)
class BedAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'room',
        'bed_number',
        'status',
        'created_at',
    )

    list_filter = (
        'status',
        'room',
    )

    search_fields = (
        'bed_number',
        'room__room_number',
    )




