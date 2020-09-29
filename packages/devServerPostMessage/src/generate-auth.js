// @ts-check
const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

require('fs').writeFileSync('./config.json', JSON.stringify(vapidKeys))
