<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <button @click="subscribe">Abonieren</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {subscribe} from './pushNotifications'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    subscribe
  }
}
</script>
