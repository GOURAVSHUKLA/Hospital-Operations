from django.db import models


class Room(models.Model):

    ROOM_TYPES = [
        ('GENERAL', 'General'),
        ('PRIVATE', 'Private'),
        ('ICU', 'ICU'),
        ('EMERGENCY', 'Emergency'),
        ('OPERATION_THEATRE', 'Operation Theatre'),
    ]

    ROOM_STATUS = [
        ('AVAILABLE', 'Available'),
        ('OCCUPIED', 'Occupied'),
        ('MAINTENANCE', 'Maintenance'),
    ]

    room_number = models.CharField(max_length=20, unique=True)

    room_type = models.CharField(
        max_length=30,
        choices=ROOM_TYPES
    )

    floor = models.PositiveIntegerField()

    room_charges = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=ROOM_STATUS,
        default='AVAILABLE'
    )

    total_beds = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Room {self.room_number}"


class Bed(models.Model):

    BED_STATUS = [
        ('AVAILABLE', 'Available'),
        ('OCCUPIED', 'Occupied'),
        ('MAINTENANCE', 'Maintenance'),
    ]

    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='beds'
    )

    bed_number = models.CharField(max_length=20)

    status = models.CharField(
        max_length=20,
        choices=BED_STATUS,
        default='AVAILABLE'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bed {self.bed_number} - Room {self.room.room_number}"

    class Meta:
        unique_together = ('room', 'bed_number')