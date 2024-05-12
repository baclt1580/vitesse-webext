<script setup lang="ts">
import { onMessage } from 'webext-bridge/popup';

onMessage("tab-prev",e=>{
  console.log("收到消息",e)
})


</script>

<template>
  <p class="text-base text-red-500">
    hello extension
  </p>
</template>
