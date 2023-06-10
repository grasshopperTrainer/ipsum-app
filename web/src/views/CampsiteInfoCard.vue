<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title> 캠프사이트 </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button id="open-create-campg" @click="() => isModalOpen = true"> 추가 </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-card-content>
    <basic  :isModalOpen="isModalOpen" @clickCancel="onClickCancel" @clickAccept="onClickAccept"></basic>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonToolbar } from '@ionic/vue'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { IonButtons, IonButton } from '@ionic/vue';
import { useOperator } from '@/stores/operatorStore';
import Basic from './campgroundCreate/Basic.vue';
import Campground from '@/assets/ts/interfaces/Campground';

const isModalOpen = ref(false)
const op = useOperator()

function onClickCancel() {
  isModalOpen.value = false
}
function onClickAccept() {
  isModalOpen.value = false
}
</script>
