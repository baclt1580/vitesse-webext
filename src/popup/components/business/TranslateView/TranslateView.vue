<script lang='ts' setup>
import TranslateDirection from './components/TranslateDirection/TranslateDirection.vue';
import TranslateRange from './components/TranslateRange/TranslateRange.vue';
import TranslatePosition from './components/TranslatePosition/TranslatePosition.vue';
import TranslateBtns from "./components/TranslateBtns/TranslateBtns.vue"
</script>
<template>
    <div>
        <!-- 翻译方向 -->
        <TranslateDirection class="mt-6"></TranslateDirection>
        <!-- 翻译范围 -->
        <TranslateRange class="mt-6"></TranslateRange>
        <!-- 译文位置 -->
        <TranslatePosition class="mt-4"></TranslatePosition>
        <TranslateBtns class="mt-8"></TranslateBtns>
        <div class="absolute bottom-2 left-2 text-nowrap cursor-pointer">仅显示原文</div>
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>