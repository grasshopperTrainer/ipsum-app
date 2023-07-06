<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        캠프그라운드 편집
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <simple-ion-list>
      <ion-list-header>
        <ion-label>
          <h1>
            사업장 정보
          </h1>
        </ion-label>
      </ion-list-header>
      <ion-item>
        <ion-input :readonly="props.readony" label="이름" v-model="props.campground.name" placeholder=""></ion-input>
      </ion-item>
      <ion-item>
        <ion-input :readonly="props.readony" label="주소" v-model="props.campground.address" placeholder=""></ion-input>
      </ion-item>
      <ion-item>
        <ion-input :readonly="props.readony" label="전화번호" v-model="props.campground.phoneNumber" placeholder=""></ion-input>
      </ion-item>
    </simple-ion-list>
  </ion-content>
  <ion-footer>
    <slot name="footer"></slot>
  </ion-footer>
</template>

<script setup lang="ts">
import { IonHeader, IonFooter, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { IonInput } from '@ionic/vue'
import { IonListHeader, IonItem, IonLabel } from '@ionic/vue'
import SimpleIonList from '@/components/SimpleIonList.vue';
import type Campground from '@/assets/ts/interfaces/Campground'


const props = defineProps<{
  campground: Campground
  readony: boolean
}>()

</script>
