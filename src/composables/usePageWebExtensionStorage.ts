import { MaybeRefOrGetter } from "vue";
import { useActiveTab } from "~/common/use/useActiveTab.use";
import { useWebExtensionStorage } from "./useWebExtensionStorage";
//仅限contentScript和popup使用
let activeTab = useActiveTab()
export function useWebExtensionStoragePage<T>(key: string,
    initialValue: MaybeRefOrGetter<T>) {
    let origin = useWebExtensionStorage<Map<string, T>>(key, new Map(), { session: true });
    const storagePage = computed<T>(() => {
        let initV = unref(initialValue);
        if (initV instanceof Function) {
            initV = initV()
        }
        if (!activeTab.value?.id) {
            return initV;
        }
        if (!origin.value.has(activeTab.value?.id + "")) {
            let setting = initV;
            origin.value.set(activeTab.value?.id + "", setting)
            return setting
        }
        return origin.value.get(activeTab.value?.id + "") as T;
    })
    return storagePage;

}