import { onMessage } from "webext-bridge/content-script"
import { visibles } from "../state/visible"
import { status } from "../state/status.state"

export function controller() {
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
    onMessage("getStatus_c",()=>{
        return status.value
    })
}