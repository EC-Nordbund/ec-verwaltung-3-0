import { createApp } from 'vue'
// @ts-expect-error
import App from './App.vue'
import './index.css'
import { createStorageWorker } from "@ec-nordbund/storage/src/client";

window.myStorage = createStorageWorker('ecIstSuperTollABCDE')

navigator.serviceWorker.register('/sw.js')

createApp(App).mount('#app')
