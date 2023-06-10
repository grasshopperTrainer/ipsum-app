<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title> 가맹 정보 </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item v-if="op.isFranchiseePresent()" :button="true">
        <ion-label>
          {{ (op.franchisee as Franchisee).companyName }}
        </ion-label>
      </ion-item>
      <ion-item v-else :disabled="true">
        <ion-label>
          가맹 정보가 없습니다. 가맹 정보를 추가하세요.
        </ion-label>
      </ion-item>
      <ion-toolbar v-if="!op.isFranchiseePresent()" >
        <ion-buttons slot="primary">
          <ion-button @click="openModal">
            생성
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-card-content>
  </ion-card>
  <franchisee-create-modal :isModalOpen="isModalOpen" @clickCancel="onCreateCancel"
    @clickAccept="onCreateAccept"></franchisee-create-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonToolbar } from '@ionic/vue'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { IonButtons, IonButton } from '@ionic/vue';
import { IonItem, IonLabel } from '@ionic/vue'
import FranchiseeCreateModal from '@/views/FranchiseeCreateModal.vue'
import Franchisee from '@/assets/ts/interfaces/Franchisee';
import { useOperator } from '@/stores/operatorStore'

const isModalOpen = ref(false)
const op = useOperator()

function openModal() {
  isModalOpen.value = true
}

function onCreateCancel() {
  isModalOpen.value = false
}

function onCreateAccept() {
  isModalOpen.value = false
}
</script>
