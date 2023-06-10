<template>
  <ion-modal :is-open="props.isModalOpen">
    <ion-nav :root="Basic" :rootParams="{ isModalOpen: props.isModalOpen }"></ion-nav>
  </ion-modal>
</template>

<script setup lang="ts">
// import { watch } from 'vue';
import { storeToRefs } from 'pinia'
import { IonModal, IonNav } from '@ionic/vue'
import type Campground from '@/assets/ts/interfaces/Campground'
import Basic from '@/views/campgroundCreate/Basic.vue';
import { watch } from 'vue';

const props = defineProps<{
  isModalOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'clickCancel'): void
  (e: 'clickAccept', campground: Campground): void
}>()

</script>
