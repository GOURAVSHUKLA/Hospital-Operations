import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  saveNotifications,
} from './notificationStorage';
import './NotificationList.css';

function NotificationList() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(getNotifications);
  const [filter, setFilter] = useState('All');

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'Unread') return !notification.isRead;
    if (filter === 'Read') return notification.isRead;
    return true;
  });

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, isRead: true }
        : notification
    );

    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));

    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const deleteNotification = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this notification?'
    );

    if (!confirmDelete) return;

    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );

    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  return (
    <div className="notification-page">
      <div className="notification-header">
        <div>
          <h1>Notifications</h1>
          <p>You have {unreadCount} unread notifications.</p>
        </div>

        <button
          className="mark-all-btn"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark All as Read
        </button>
      </div>

      <div className="notification-toolbar">
        <div className="notification-filters">
          {['All', 'Unread', 'Read'].map((item) => (
            <button
              key={item}
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <span>{filteredNotifications.length} notifications</span>
      </div>

      <div className="notification-list">
        {filteredNotifications.length === 0 ? (
          <div className="notification-empty">
            <h3>No notifications found</h3>
            <p>There are no notifications in this category.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              className={`notification-card ${
                notification.isRead ? 'read' : 'unread'
              }`}
              key={notification.id}
            >
              <div className="notification-content">
                <div className="notification-title-row">
                  <h3>{notification.title}</h3>
                  <span
                    className={`notification-type ${notification.type.toLowerCase()}`}
                  >
                    {notification.type}
                  </span>
                </div>

                <p>{notification.message}</p>
                <small>{notification.date}</small>
              </div>

              <div className="notification-actions">
                {!notification.isRead && (
                  <button
                    className="read-btn"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark Read
                  </button>
                )}

                <button
                  className="delete-notification-btn"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationList;