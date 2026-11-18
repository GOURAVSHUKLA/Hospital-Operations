from django.urls import path

from .views import (
    NotificationListView,
    MarkNotificationReadView,
    MarkAllNotificationsReadView,
    DeleteNotificationView
)


urlpatterns = [

    # Get all notifications
    path(
        '',
        NotificationListView.as_view(),
        name='notification-list'
    ),

    # Mark individual notification as read
    path(
        '<int:pk>/read/',
        MarkNotificationReadView.as_view(),
        name='notification-read'
    ),

    # Mark all notifications as read
    path(
        'read-all/',
        MarkAllNotificationsReadView.as_view(),
        name='notification-read-all'
    ),

    # Delete notification
    path(
        '<int:pk>/delete/',
        DeleteNotificationView.as_view(),
        name='notification-delete'
    ),

]