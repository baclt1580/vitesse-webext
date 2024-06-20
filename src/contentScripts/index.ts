/* eslint-disable no-console */
import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from '~/logic/common-setup'
import "~/styles/tailwind.css"
import 'vfonts/Lato.css'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  
  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  document.body.appendChild(styleEl)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(container)
  console.log("加载完毕")
})()