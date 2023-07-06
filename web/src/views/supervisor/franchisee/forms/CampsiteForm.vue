<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        캠프사이트 편집
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :scroll-x="true">
    <simple-ion-list>
      <ion-item>
        <ion-input label="이름"
                   placeholder="e.g. 탠트구역A"
                   v-model="props.campsite.name"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>
          캠프사이트 위치 지정
        </ion-label>
      </ion-item>
      <ion-item>
        <div class="map">
        </div>
      </ion-item>
    </simple-ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonHeader, IonContent,
  IonToolbar, IonTitle,
  IonInput, IonItem, IonLabel,
} from '@ionic/vue'
import SimpleIonList from '@/components/SimpleIonList.vue'
import type Campsite from '@/assets/ts/interfaces/Campsite'

const props = defineProps<{
  campsite: Campsite
  readonly: boolean
}>()
</script>

<style scoped>
.map {
  width: 100vw;
  height: 50vh;
  background-color: blue;
}
</style>
