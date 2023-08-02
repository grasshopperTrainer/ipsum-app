<template>
    <ion-item :button="props.button"
              :disabled="props.readonly"
              @click.stop="event => emit('clickItem', event)">
        <ion-label>
            <slot></slot>
        </ion-label>
        <ion-toggle labelPlacement="start"
                    justify="start"
                    :disabled="props.readonly"
                    :checked="props.toggleChecked"
                    @click.stop="event => emit('clickToggle', event)">
        </ion-toggle>
    </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonToggle } from '@ionic/vue'

const props = withDefaults(
    defineProps<{
        readonly?: boolean
        toggleChecked?: boolean
        button?: boolean
    }>(),
    {
        readonly: false,
        toggleChecked: false,
        button: false
    })
const emit = defineEmits<{
    (e: 'clickToggle', event: CustomEvent): void
    (e: 'clickItem', event: CustomEvent): void
}>()
</script>

<style scoped></style>