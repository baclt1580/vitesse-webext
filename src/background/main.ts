import "reflect-metadata";
import { initContainer } from "./ioc/container";
import { translateController } from "./controller/tranlate.controller";
import { onMessage, sendMessage } from "webext-bridge/background";
import { Tabs } from "webextension-polyfill";
import { isFirefox } from "~/env";
import { controller } from "./controller/controller";
import { useActiveTabId } from "~/common/use/useActiveTabId.use";


// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}
// let fetch = self.fetch;
// Object.defineProperty(self, "fetch", {
//   get() {
//     return (...params: any) => {
//       console.log("fetch", params)
//       return (fetch as any)(...params)
//     }
//   }
// })

browser.runtime.onInstalled.addListener(async () => {
  initContainer()
  let {init:initActiveTabId}=useActiveTabId()
  initActiveTabId()
  translateController()
  controller()
})




