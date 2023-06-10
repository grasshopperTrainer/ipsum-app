<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        캠프사이트 그룹 추가
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <simple-ion-list :inset="true">
      <ion-list-header>
        <ion-label>
          <h1>
            그룹 목록
          </h1>
        </ion-label>
      </ion-list-header>
      <ion-nav-link router-direction="forward" :component="Group">
        <ion-item v-for="group in campgGroups" class="group">
          {{ group.name }}
        </ion-item>
      </ion-nav-link>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button @click="onClickAddGroup"> + </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </simple-ion-list>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-nav-link router-direction="back">
          <ion-button> 뒤로 </ion-button>
        </ion-nav-link>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button> 완료 </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonPage, IonHeader, IonFooter, IonToolbar, IonTitle, IonContent, IonNavLink, IonActionSheet } from '@ionic/vue'
import { IonModal } from '@ionic/vue';
import { IonButtons, IonButton } from '@ionic/vue';
import { IonInput } from '@ionic/vue'
import { IonList, IonListHeader, IonItem, IonLabel } from '@ionic/vue'
import SimpleIonList from '@/components/SimpleIonList.vue';

import type Campground from '@/assets/ts/interfaces/Campground';
import type CampsiteGroup from '@/assets/ts/interfaces/CampsiteGroup';

import Group from './Group.vue';


const isActionSheetOpen = ref(false)
const campgGroups = ref<CampsiteGroup[]>([])

const actionSheetButtons = [
  {
    text: '삭제',
    role: 'destructive',
    data: {
      action: 'delete',
    },
  },
  {
    text: '편집',
    data: {
      action: 'edit',
    },
  },
  {
    text: '취소',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
]

function onClickAddGroup() {
  console.log('click')
  let index = campgGroups.value.length
  while (true) {
    const newName = `그룹 ${index}`
    if (campgGroups.value.filter(x => x.name == newName).length != 0) {
      index += 1
    } else {
      const newCampsiteGroup: CampsiteGroup = { name: newName, campsites: [] }
      campgGroups.value.push(newCampsiteGroup)
      break
    }
  }
}
</script>

<style scoped>
</style>