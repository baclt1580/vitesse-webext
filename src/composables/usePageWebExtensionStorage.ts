import { MaybeRefOrGetter } from "vue";
import { useWebExtensionStorage } from "./useWebExtensionStorage";
import { useActiveTabId } from "~/common/use/useActiveTabId.use";
//仅限contentScript和popup使用
let {activeTabId}=useActiveTabId()
export function useWebExtensionStoragePage<T>(key: string,
    initialValue: MaybeRefOrGetter<T>) {
    key=key+"_page";
    let origin = useWebExtensionStorage<Map<string, T>>(key, new Map());
    const storagePage = computed<T>({
        get() {
            let initV = unref(initialValue);
            if (initV instanceof Function) {
                initV = initV()
            }
            if (!activeTabId.value) {
                return initV;
            }
            if (!origin.value.has(activeTabId.value + "")) {
                let setting = initV;
                origin.value.set(activeTabId.value + "", setting)
                return setting
            }
            return origin.value.get(activeTabId.value+ "") as T;
        },
        set(v) {
            origin.value.set(activeTabId.value + "", v)
        }
    })
    return storagePage;

}