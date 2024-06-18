import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'
import { useFireBaseAuth } from './use/useFirebaseAuth.use'
import { sendEmailVerification, signInWithEmailAndPassword } from '@firebase/auth'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}
let fetch=self.fetch;
Object.defineProperty(self,"fetch",{
  get(){
    return (...params:any)=>{
      console.log("fetch",params)
      return (fetch as any)(...params)
    }
  }
})
browser.runtime.onInstalled.addListener(async () => {
  let auth = useFireBaseAuth()

  browser.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  setTimeout(async () => {
    if (auth.value) {
      await auth.value.authStateReady();
      

      console.log(auth.value.currentUser?.email)
      browser.notifications.create({
        iconUrl: browser.runtime.getURL("assets/icon-512.png"),
        title: "登录成功",
        message: auth.value.currentUser?.email || "",
        type: 'basic'
      })
    }
  }, 3000)

})



// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {

  console.log('previous tab', tabId)
  sendMessage('tab-prev', { title: tabId + "" }, 'popup')
})

