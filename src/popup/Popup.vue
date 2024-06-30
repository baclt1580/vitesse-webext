<script setup lang="ts">
import { onMessage } from 'webext-bridge/popup';

onMessage("tab-prev", e => {
  console.log("收到消息", e)
})

let v=ref(0)
</script>

<template>
  <div class="w-[430px] h-[600px] bg-white">
    {{ v }}
    <n-button @click="v++">测试</n-button>
  </div>
</template>
