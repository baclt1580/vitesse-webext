import { onMessage } from "webext-bridge/content-script"
import { visibles } from "../state/visible"
import { translateController } from "./translate.controller"
export function controller() {
    translateController()
    console.log("initController")
    onMessage("toLogin", () => {
        console.log("收到消息tologin")
        visibles.value.login = true
        visibles.value.register = false
    })
    onMessage("toRegister", () => {
        console.log("收到消息toRegister")
        visibles.value.register = true
    })
   
    
}