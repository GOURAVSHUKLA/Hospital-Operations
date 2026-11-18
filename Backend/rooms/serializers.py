from rest_framework import serializers

from .models import Room, Bed


class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'

    def validate_total_beds(self, value):

        if value <= 0:
            raise serializers.ValidationError(
                "A room must have at least one bed."
            )

        if self.instance:
            existing_beds = self.instance.beds.count()

            if value < existing_beds:
                raise serializers.ValidationError(
                    f"This room already has {existing_beds} beds."
                )

        return value

    def validate_room_charges(self, value):

        if value < 0:
            raise serializers.ValidationError(
                "Room charges cannot be negative."
            )

        return value


class BedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bed
        fields = '__all__'

    def validate(self, attrs):

        room = attrs.get(
            'room',
            self.instance.room if self.instance else None
        )

        if room:

            existing_beds = room.beds.count()

            # Moving an existing bed to another room
            moving_bed = (
                self.instance is not None
                and self.instance.room_id != room.id
            )

            if self.instance is None or moving_bed:

                if existing_beds >= room.total_beds:
                    raise serializers.ValidationError({
                        'room': 'This room has reached its maximum bed capacity.'
                    })

        return attrs