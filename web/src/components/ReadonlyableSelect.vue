<template>
  <template v-if="!props.readonly">
    <ion-select :label="props.label"
                :interface="props.interface"
                :placeholder="props.placeholder"
                :selected-text="readonlyText"
                @ionChange="(e: CustomEvent) => emit('ionChange', e.detail.value)">
      <ion-select-option v-for="item in items"
                         :value="item">
        <slot :item="item"></slot>
      </ion-select-option>
    </ion-select>
  </template>
  <template v-else>
    <ion-label>
      {{ props.label }}
    </ion-label>
    <ion-label slot="end"
               color="medium">
      {{ readonlyText }}
    </ion-label>
  </template>
</template>

<script setup lang="ts">
import { IonItem, IonSelect, IonSelectOption, IonLabel } from '@ionic/vue'

const props = defineProps<{
  label: string
  interface: 'action-sheet' | 'popover' | 'alert'
  placeholder: string
  items: { [key: string]: any }[]
  readonlyText: string
  readonly: boolean
}>()

const emit = defineEmits<{
  (e: 'ionChange', selectedItem: any): void
}>()
</script>

<style scoped></style>
