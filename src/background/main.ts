import "reflect-metadata";
import { initContainer } from "./ioc/container";
import { translateController } from "./controller/tranlate.controller";
import { onMessage, sendMessage } from "webext-bridge/background";
import { Tabs } from "webextension-polyfill";
import { isFirefox } from "~/env";

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
  translateController()
  // remove or turn this off if you don't use side panel
  const USE_SIDE_PANEL = true

  // to toggle the sidepanel with the action button in chromium:
  if (USE_SIDE_PANEL) {
    // @ts-expect-error missing types
    browser.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error: unknown) => console.error(error))
  }
  browser.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open side panel',
    contexts: ['all']
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
      // This will open the panel in all the pages on the current window.
      if(!isFirefox&&tab){
        chrome.sidePanel.open({
          windowId: tab.windowId as number
        })
      }
     
     
    }
  });
})




