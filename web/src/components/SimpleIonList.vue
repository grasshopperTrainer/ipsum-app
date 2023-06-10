<template>
  <ion-list :inset="true">
    <slot></slot>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue'
defineProps({
  name: String,
});
</script>

<style scoped>

</style>
