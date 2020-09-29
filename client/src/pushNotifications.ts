const URL = import.meta.env.DEV ? 'http://localhost:3333' : ''

function sendSubscriptionToServer(subscription:PushSubscription) {
  return fetch(URL + '/subscribe', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(subscription)
  })
}

export async function subscribe() {
  const sw = await navigator.serviceWorker.ready

  const sub = await sw.pushManager.getSubscription()

  if (!sub) {
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_public_key_push
    })

    sendSubscriptionToServer(subscription)

    return
  }

  sendSubscriptionToServer(sub)
}