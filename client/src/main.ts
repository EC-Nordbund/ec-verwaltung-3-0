import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


import { createStorageWorker } from "@ec-nordbund/storage/src/client";
const a = createStorageWorker('mypwkjfgdsgkjgdjkdkjlddddjkgh94w0850435ujlkd')

window.data = a

navigator.serviceWorker.register('/sw.js')

createApp(App).mount('#app')
