import { setupPushNotification } from "./pushNotification";

// Type Hack
const _self = (self as unknown) as ServiceWorkerGlobalScope

// On install
_self.addEventListener("install", () => _self.skipWaiting());
_self.addEventListener("activate", () => _self.clients.claim());

setupPushNotification(_self)