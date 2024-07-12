import { useWebExtensionStoragePage } from "~/composables/usePageWebExtensionStorage";
//未注入,空闲,翻译中
type TranslateStatus="unInject"|"notAllowedInject"|"injecting"|"free"|"translating"|"injectError"
export const translateStatus=useWebExtensionStoragePage<TranslateStatus>("translateStatus","unInject");