/**
 * add Eventlistener to Push event this will be triggert when the server sends a message to the subscribed client
 */
export function setupPushNotification(_self: ServiceWorkerGlobalScope) {
  _self.addEventListener('push', ev => {
    // Check if notification allowed
    if (!Notification || Notification.permission !== 'granted') { return }

    // Parse server Data
    const { body, title } = ev.data?.json()

    // show notification
    _self.registration.showNotification(title, { body })
  })
}