from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.serializers import CustomTokenObtainPairSerializer
from accounts.views import PatientRegistrationView
from .views import AdminDashboardView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

urlpatterns = [

# Patient Registration
path('register/', PatientRegistrationView.as_view(), name='patient_register'),
# JWT Authentication
path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
]