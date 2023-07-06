<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        가맹점 편집
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
        <ion-input label="사업장 이름"
                   placeholder=""
                   v-model="props.franchisee.companyName"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="사업자등록번호"
                   placeholder=""
                   v-model="props.franchisee.companyRegistrationNumber"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="주소"
                   placeholder=""
                   v-model="props.franchisee.companyAddress"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="전화번호"
                   placeholder=""
                   v-model="props.franchisee.companyPhoneNuber"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="email"
                   placeholder=""
                   v-model="props.franchisee.companyEmail"
                   :readonly="props.readonly"></ion-input>
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
        <ion-input label="이름"
                   placeholder=""
                   v-model="props.franchisee.ownerName"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="주소"
                   placeholder=""
                   v-model="props.franchisee.ownerAddress"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="전화번호"
                   placeholder=""
                   v-model="props.franchisee.ownerPhoneNumber"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
    </simple-ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { IonInput } from '@ionic/vue'
import { IonListHeader, IonItem, IonLabel } from '@ionic/vue'
import Franchisee from '@/assets/ts/interfaces/Franchisee'
import SimpleIonList from '@/components/SimpleIonList.vue'

const props = defineProps<{
  franchisee: Franchisee
  readonly: boolean
}>()
</script>
