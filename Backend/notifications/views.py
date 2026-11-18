from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from .models import Notification
from .serializers import NotificationSerializer


# Get all notifications of logged-in user

class NotificationListView(generics.ListAPIView):

    serializer_class = NotificationSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Notification.objects.filter(
            recipient=self.request.user
        )


# Mark individual notification as read

class MarkNotificationReadView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        notification = get_object_or_404(
            Notification,
            pk=pk,
            recipient=request.user
        )

        notification.is_read = True
        notification.save(update_fields=['is_read'])

        return Response(
            {
                'message': 'Notification marked as read.'
            },
            status=status.HTTP_200_OK
        )


# Mark all notifications as read

class MarkAllNotificationsReadView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request):

        Notification.objects.filter(
            recipient=request.user,
            is_read=False
        ).update(is_read=True)

        return Response(
            {
                'message': 'All notifications marked as read.'
            },
            status=status.HTTP_200_OK
        )


# Delete individual notification

class DeleteNotificationView(generics.DestroyAPIView):

    serializer_class = NotificationSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Notification.objects.filter(
            recipient=self.request.user
        )