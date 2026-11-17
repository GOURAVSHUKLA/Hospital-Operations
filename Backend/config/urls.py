from django.contrib import admin
from django.urls import path, include


urlpatterns = [

    # Django Admin Panel
    path('admin/', admin.site.urls),

    # Accounts APIs
    path('api/', include('accounts.urls')),

    # Doctors APIs
    path('api/', include('doctors.urls')),

]