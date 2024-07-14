<script lang='ts' setup>
import { translateStatus } from '~/common/storage/translateStatus.use';
onMounted(()=>{
    console.log("translateStatus",translateStatus)
})
watch(translateStatus,v=>{
    console.log("v",v)
})
</script>
<template>
    <!-- 'text-[#38b47b]': status == 'success', 'text-[#ed7899] -->
    <div class="flex items-center" >
        <!-- <img src="./assets/img/ok.svg" class="w-6" v-if="status == 'success'"> -->
        <img src="./assets/img/error.svg" class="w-6">
        <span class="ml-1 text-xs  font-[500]">{{ translateStatus }}</span>
    </div>


</template>

<script lang='ts'>


export default {

}
</script>

<style></style>