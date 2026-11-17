from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from accounts.registration_serializers import RegistrationSerializer


class PatientRegistrationView(CreateAPIView):

    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]