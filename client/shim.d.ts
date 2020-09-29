import { Component } from "vue";

declare module '*.vue' {
  export default Component
}

// declare interface ImportMeta {
//   env: {
//     VITE_POST_MESSAGE_PUBLIC_KEY: string,
//     DEV: boolean,
//     PROD: boolean
//   }
// }