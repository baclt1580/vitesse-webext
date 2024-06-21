import { sendMessage } from 'webext-bridge/background'
import {sendOpenAiMessage} from "./utils/openai.util"
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
  let msg=await sendOpenAiMessage("hello")
  console.log("gpt:",msg);
})

