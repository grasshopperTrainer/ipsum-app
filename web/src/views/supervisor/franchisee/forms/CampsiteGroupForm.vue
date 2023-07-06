<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        캠프사이트 그룹 편집
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :scroll-x="true">
    <simple-ion-list :inset="true">
      <ion-item>
        <readonlyable-select label="캠프그라운드"
                             interface="popover"
                             placeholder="사이트가 소속된 캠프그라운드 선택"
                             :readonly="props.readonly || !props.init"
                             :readonly-text="franch.getCampground(props.campsiteGroup.campgroundId) == null ? '' : franch.getCampground(props.campsiteGroup.campgroundId)!.name"
                             :items="props.franchisee.campgrounds"
                             @ionChange="(item: Campground) => props.campsiteGroup.campgroundId = item.id!"
                             #default="{ item }">
          {{ item.name }}
        </readonlyable-select>
      </ion-item>
      <ion-item>
        <ion-input label="이름"
                   placeholder="e.g. 탠트구역A"
                   v-model="props.campsiteGroup.name"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea label="설명"
                      placeholder="캠프사이트에 대한 설명"
                      v-model="props.campsiteGroup.description"
                      :readonly="props.readonly"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label> 체크인-아웃 </ion-label>
        <range-time-picker :disabled="props.readonly"
                           :start-value="props.campsiteGroup.checkin"
                           :end-value="props.campsiteGroup.checkout"
                           @ion-change-start="e => props.campsiteGroup.checkin = e.detail.value"
                           @ion-change-end="e => props.campsiteGroup.checkout = e.detail.value"></range-time-picker>
      </ion-item>
    </simple-ion-list>

    <ion-card>
      <ion-card-header>
        <ion-card-title>
          캠프사이트 특징
        </ion-card-title>
        <ion-card-subtitle>
          캠프사이트 유형이 가진 특장점 선택
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <campsite-merits-selector :readonly="props.readonly"
                                  v-model="props.campsiteGroup.merits"></campsite-merits-selector>
      </ion-card-content>
    </ion-card>
    <campsite-card :campsite-group="props.campsiteGroup"
                   :readonly="props.readonly"></campsite-card>
  </ion-content>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  IonHeader, IonContent,
  IonToolbar, IonTitle,
  IonInput, IonItem, IonLabel,
  IonTextarea,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/vue'
import SimpleIonList from '@/components/SimpleIonList.vue'
import { useFranchisee } from '@/stores/franchiseeStore'
import CampsiteMeritsSelector from '../etc/CampsiteMeritsSelector.vue'
import CampsiteCard from '../cards/CampsiteCard.vue'
import RangeTimePicker from '@/components/RangeTimePicker.vue'
import ReadonlyableSelect from '@/components/ReadonlyableSelect.vue'
import type CampsiteGroup from '@/assets/ts/interfaces/CampsiteGroup'
import type Franchisee from '@/assets/ts/interfaces/Franchisee'
import Campground from '@/assets/ts/interfaces/Campground'

const props = defineProps<{
  readonly: boolean
  init: boolean
  campsiteGroup: CampsiteGroup
  franchisee: Franchisee
}>()

// create, edit 상황에 따라 초기 값을 달리함
const franch = useFranchisee()
const merits = ref(props.campsiteGroup.merits)

watch(merits, () => {
  console.log('new merits ', merits)
})
</script>

<style scoped></style>
