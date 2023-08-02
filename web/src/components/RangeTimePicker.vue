<template>
    <ion-datetime-button :disabled="props.disabled" datetime="start"></ion-datetime-button>
    -
    <ion-datetime-button :disabled="props.disabled" datetime="end"></ion-datetime-button>

    <ion-modal :keep-contents-mounted="true">
        <ion-datetime size="cover" class="datetime" id="start" presentation="time" :value="props.startValue" @ion-change="e => emit('ionChangeStart', e)"></ion-datetime>
    </ion-modal>
    <ion-modal :keep-contents-mounted="true">
        <ion-datetime size="cover" class="datetime" id="end" presentation="time" :value="props.endValue" @ion-change="e => emit('ionChangeEnd', e)"></ion-datetime>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue'

const props = defineProps<{
    disabled: boolean
    startValue: string
    endValue: string
}>()
const emit = defineEmits<{
    (e: 'ionChangeStart', event: CustomEvent): void
    (e: 'ionChangeEnd', event: CustomEvent): void
}>()

</script>

<style scoped></style>