const URL = import.meta.env.DEV ? 'http://localhost:3333' : ''

export async function subscribe() {
  const sw = await navigator.serviceWorker.ready

  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_public_key_push
  })

  fetch(URL + '/subscribe', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(subscription)
  })
}