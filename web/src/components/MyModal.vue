<template>
  <ion-modal :is-open="props.isModalOpen">
    
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonHeader, IonFooter, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { IonModal } from '@ionic/vue';
import { IonButtons, IonButton } from '@ionic/vue';
import { IonInput } from '@ionic/vue'
import { IonList, IonListHeader, IonItem, IonLabel } from '@ionic/vue'

import Franchisee from '@/assets/ts/interfaces/Franchisee'

const props = defineProps<{
  isModalOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'accept', franchisee: Franchisee): void
}>()

const franchisee = ref<Franchisee>({} as Franchisee)

function onClickCancel() {
  emit('cancel')
  franchisee.value = {} as Franchisee
}

function onClickAccept() {
  emit('accept', JSON.parse(JSON.stringify(franchisee.value)))
  franchisee.value = {} as Franchisee
}

</script>
