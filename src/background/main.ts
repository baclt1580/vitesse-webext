import "reflect-metadata";
import { initContainer } from "./ioc/container";
import { translateController } from "./controller/tranlate.controller";
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
//初始化
; (async () => {
  initContainer()
  let { init: initActiveTabId } = useActiveTabId()
  initActiveTabId()
  translateController()
  controller()
})()
browser.runtime.onInstalled.addListener(async () => {
  console.log("安装了")
})
browser.runtime.onStartup.addListener(() => {
  clearPageStorage()
})
//清理所有的页面级缓存
async function clearPageStorage() {
  console.log("清楚page缓存")
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



