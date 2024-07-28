<script lang='ts' setup>
import TranslateDirection from './components/TranslateDirection/TranslateDirection.vue';
import TranslatePosition from './components/TranslatePosition/TranslatePosition.vue';
import TranslateBtns from "./components/TranslateBtns/TranslateBtns.vue"
import { currentLang } from '~/popup/state/currentLang.state';



</script>
<template>
    <div>
        <div>
            当前页面语言: {{currentLang?.zh}}
        </div>
        <!-- 翻译方向 -->
        <TranslateDirection class="mt-4"></TranslateDirection>
        <!-- 翻译范围 -->
        <!-- <TranslateRange class="mt-6"></TranslateRange> -->
        <!-- 译文位置 -->
        <TranslatePosition class="mt-4"></TranslatePosition>
        <TranslateBtns class="mt-8"></TranslateBtns>

    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>