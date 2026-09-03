/* eslint-disable no-undef */

// Forzar activacion inmediata del nuevo service worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch {
    payload = { notification: { title: 'FCM', body: event.data.text() } };
  }

  const notification = payload.notification || {};
  const title = notification.title || 'Notificacion';
  const body = notification.body || '';
  const data = payload.data || {};

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      const focusedClient = windowClients.find((c) => c.visibilityState === 'visible');

      if (focusedClient) {
        // App en foreground: enviar al panel de notificaciones in-app
        windowClients.forEach((c) => {
          c.postMessage({ type: 'FCM_PUSH', title, body, data });
        });
      } else {
        // App en background: mostrar notificacion del sistema
        return self.registration.showNotification(title, {
          body,
          icon: '/zentral-mark.svg',
          data,
        });
      }
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/tareas/mis-tareas'));
});
