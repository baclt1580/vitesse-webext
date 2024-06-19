<script lang='ts' setup>

</script>
<template>
    <div class="size-[80px] fixed bottom-8 right-8 p-2 flex items-end justify-end">
        <!-- main -->
        <div class="size-full shadow-xl flex-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 ">
            <img src="./assets/img/menu.svg" class="size-[48px] group-hover:rotate-90 transition-all duration-[0.6s]">
        </div>
        <!-- sub top -->
        <div
            class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16  flex  p-2 hover:p-3 bg-blue-300 hover:bg-blue-400  text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
            </svg>
        </div>
      
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style></style>