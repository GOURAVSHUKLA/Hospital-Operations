from rest_framework import serializers
from .models import Patient


class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['registration_date']
        extra_kwargs = {
            'user': {'required': True}
        }

    def validate_user(self, value):
        if value.role != 'PATIENT':
            raise serializers.ValidationError(
                "Only users with PATIENT role can have a patient profile."
            )

        existing = Patient.objects.filter(user=value)

        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)

        if existing.exists():
            raise serializers.ValidationError(
                "This user already has a patient profile."
            )

        return value