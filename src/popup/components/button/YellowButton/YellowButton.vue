<script lang='ts' setup>

</script>
<template>
    <button class="px-2 py-1">
        <slot></slot>
    </button>
</template>

<script lang='ts'>
export default {

}
</script>

<style scoped>
button {
    background: #fbca1f;
    font-family: inherit;
    font-weight: 900;
    font-size: 12px;
    border: 3px solid black;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em;
    cursor: pointer;
}

button:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
}

button:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em;
}
</style>