<script lang='ts' setup>
defineProps<{
    content:string
}>()
</script>
<template>
    <div class="tooltip-container">
        <div class="tooltip">
            {{content}}
        </div>
        <slot></slot>
    </div>
</template>

<script lang='ts'>


export default {

}
</script>

<style scoped>
.tooltip-container {
    --background: #333333;
    --color: #e8e8e8;
    position: relative;
}

.tooltip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.3em 0.6em;
    text-wrap: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    background: var(--background);
    z-index: 1;
    border-radius: 8px;
    scale: 0;
    transform-origin: 0 0;
    text-transform: capitalize;
    font-weight: 400;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    color:#ffffff;
}

.tooltip::before {
    position: absolute;
    content: "";
    height: 0.6em;
    width: 0.6em;
    bottom: -0.2em;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    background: var(--background);
}

.tooltip-container:hover .tooltip {
    top: -150%;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    scale: 1;
    z-index: 9;
    animation: shake 0.5s ease-in-out both;
}



@keyframes shake {
    0% {
        rotate: 0;
    }

    25% {
        rotate: 7deg;
    }

    50% {
        rotate: -7deg;
    }

    75% {
        rotate: 1deg;
    }

    100% {
        rotate: 0;
    }
}
</style>