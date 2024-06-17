import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener(async () => {
  
  setTimeout(() => {
    sendMessage("test","test123","popup")
    browser.notifications.create({
      iconUrl:browser.runtime.getURL("assets/icon-512.png"),
      title: "测试通知",
      message: "测试通知",
      type: 'basic'
    })
  }, 3000)

})



// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {

  console.log('previous tab', tabId)
  sendMessage('tab-prev', { title: tabId + "" }, 'popup')
})

