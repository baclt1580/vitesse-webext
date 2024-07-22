/* eslint-disable no-console */
import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from '~/logic/common-setup'
import "~/styles/tailwind.css"
import 'vfonts/Lato.css'
import "normalize.css";
import { controller } from './controller/controller'
import { translateStatus } from '~/common/storage/translateStatus.use';
import { useActiveTabId } from '~/common/use/useActiveTabId.use'
import { sendMessage } from 'webext-bridge/content-script'
// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
let {tabOK}=useActiveTabId();
(async () => {
  await tabOK();
  translateStatus.value = "injecting"
  const container = document.createElement('div')
  container.id = __NAME__
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(root)
  controller()
})()


