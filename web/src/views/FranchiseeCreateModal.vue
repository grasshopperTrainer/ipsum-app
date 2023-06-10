<template>
  <ion-modal :is-open="props.isModalOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          가맹 생성
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <simple-ion-list :inset="true">
        <ion-list-header>
          <ion-label>
            <h1>
              사업장 정보
            </h1>
          </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-input label="사업장 이름" v-model="franchisee.companyName" placeholder=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="사업자등록번호" v-model="franchisee.companyRegistrationNumber" placeholder=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="주소" v-model="franchisee.companyAddress" placeholder=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="전화번호" v-model="franchisee.companyPhoneNuber" placeholder=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="email" v-model="franchisee.companyEmail" placeholder=""></ion-input>
        </ion-item>
      </simple-ion-list>

      <simple-ion-list :inset="true">
        <ion-list-header>
          <ion-label>
            <h1>
              사업자 정보
            </h1>
          </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-input label="이름" v-model="franchisee.ownerName" placeholder=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="주소" v-model="franchisee.ownerAddress" placeholder=""></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="전화번호" v-model="franchisee.ownerPhoneNumber" placeholder=""></ion-input>
        </ion-item>
      </simple-ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="secondary" @click="onClickCancel">
          <ion-button> 취소 </ion-button>
        </ion-buttons>
        <ion-buttons slot="primary" @click="onClickAccept">
          <ion-button> 생성 </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonFooter, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { IonModal } from '@ionic/vue';
import { IonButtons, IonButton } from '@ionic/vue';
import { IonInput } from '@ionic/vue'
import { IonListHeader, IonItem, IonLabel } from '@ionic/vue'
import { useOperator } from '@/stores/operatorStore';
import Franchisee from '@/assets/ts/interfaces/Franchisee'
import SimpleIonList from '@/components/SimpleIonList.vue';

const props = defineProps<{
  isModalOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'clickCancel'): void
  (e: 'clickAccept'): void
}>()
const op = useOperator()
const franchisee = ref<Franchisee>({} as Franchisee)

function onClickCancel() {
  emit('clickCancel')
  franchisee.value = {} as Franchisee
}

function onClickAccept() {
  emit('clickAccept')
  op.franchisee = JSON.parse(JSON.stringify(franchisee.value))
  franchisee.value = {} as Franchisee
}

</script>
