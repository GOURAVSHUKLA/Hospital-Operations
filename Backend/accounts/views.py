from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from accounts.registration_serializers import RegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin

class PatientRegistrationView(CreateAPIView):

    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        return Response({
            "message": "Welcome to Admin Dashboard!",
            "user": request.user.username,
            "role": request.user.role
        })