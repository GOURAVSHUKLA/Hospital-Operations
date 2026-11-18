from django.utils import timezone

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.registration_serializers import RegistrationSerializer
from .permissions import IsAdminRole

from doctors.models import Doctor
from patients.models import Patient
from employees.models import Employee
from appointments.models import Appointment
from rooms.models import Bed


class PatientRegistrationView(CreateAPIView):

    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]


class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):

        today = timezone.localdate()

        total_doctors = Doctor.objects.count()

        total_patients = Patient.objects.count()

        total_employees = Employee.objects.count()

        available_beds = Bed.objects.filter(
            status='AVAILABLE'
        ).count()

        todays_appointments = Appointment.objects.filter(
            appointment_date=today
        ).count()

        return Response({

            "message": "Welcome to Admin Dashboard!",

            "user": request.user.username,

            "role": request.user.role,

            "statistics": {
                "total_doctors": total_doctors,
                "total_patients": total_patients,
                "total_employees": total_employees,
                "available_beds": available_beds,
                "todays_appointments": todays_appointments,
                "monthly_revenue": None
            }

        })
