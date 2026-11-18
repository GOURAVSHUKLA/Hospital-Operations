from rest_framework.permissions import BasePermission, SAFE_METHODS


class AppointmentRolePermission(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        # ADMIN can perform all operations
        if user.role == 'ADMIN':
            return True

        # PATIENT can view and book appointments
        if user.role == 'PATIENT':
            return request.method in SAFE_METHODS or request.method == 'POST'

        # DOCTOR can view appointments
        if user.role == 'DOCTOR':
            return request.method in SAFE_METHODS

        return False

    def has_object_permission(self, request, view, obj):

        user = request.user

        # ADMIN can access all appointments
        if user.role == 'ADMIN':
            return True

        # PATIENT can access only their own appointments
        if user.role == 'PATIENT':
            return obj.patient.user_id == user.id

        # DOCTOR can access only their own appointments
        if user.role == 'DOCTOR':
            return obj.doctor.user_id == user.id

        return False