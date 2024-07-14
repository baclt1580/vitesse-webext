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
  await clearPageStorage()
  initContainer()
  let { init: initActiveTabId } = useActiveTabId()
  initActiveTabId()

  translateController()
  controller()
})
//清理所有的页面级缓存
async function clearPageStorage() {
  let items = await browser.storage.local.get(null);
  if (chrome.runtime.lastError) {
    console.error("获取数据时出错:", chrome.runtime.lastError);
    return;
  }
  const keysToRemove = Object.keys(items).filter(key => key.endsWith('_page'));
  if (keysToRemove.length > 0) {
    chrome.storage.local.remove(keysToRemove, () => {
      if (chrome.runtime.lastError) {
        console.error("删除数据时出错:", chrome.runtime.lastError);
      } else {
        console.log("清理缓存:", keysToRemove);
      }
    });
  } else {
    console.log("没有找到以 '_page' 结尾的键名对应的项");
  }
}



