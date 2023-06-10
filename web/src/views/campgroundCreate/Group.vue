<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        그룹 편집
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <ion-item>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-nav-link router-direction="back">
          <ion-button> 취소 </ion-button>
        </ion-nav-link>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button> 적용 </ion-button>
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