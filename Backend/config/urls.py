from django.contrib import admin
from django.urls import path, include
from django.urls import path, include

urlpatterns = [

    # Django Admin Panel
    path('admin/', admin.site.urls),

    # Accounts APIs
    path('api/', include('accounts.urls')),

    # Doctors APIs
    path('api/', include('doctors.urls')),

    # Patients APIs
    path('api/patients/', include('patients.urls')),

    # Employees APIs
     path('api/employees/', include('employees.urls')),

    #Appointment APIs
    path('api/appointments/', include('appointments.urls')),

    #Rooms APIs
    path('api/rooms/', include('rooms.urls')),

    #Expenses APIs
    path('api/expenses/', include('expenses.urls')),
]