<template>
    <div v-if="isSandbox()" class="wrapper">
        <div class="sign">
            sb
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
function isSandbox() {
    return import.meta.env.VITE_IS_SANDBOX
}
</script>

<style scoped>
.wrapper {
    border: 1px black solid;
}
.sign {
    position: absolute;
    background-color: yellow;
    font-size: 0.5em
}
</style>