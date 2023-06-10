<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title> 캠프그라운드 </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div v-if="op.isFranchiseePresent() && op.isCampgroundsPresent()">
        <ion-list>
          <ion-item v-for="campg in op.campgrounds">
            <ion-toggle labelPlacement="start" justify="space-between" :checked="campg.isActivated"
              @click="onToggleClick(campg)" @ionChange="onToggle">
              {{ campg.name }}
            </ion-toggle>
          </ion-item>
        </ion-list>
      </div>
      <div v-else-if="op.isFranchiseePresent()">
        캠프그라운드가 존재하지 않습니다. 캠프그라운드를 추가하세요.
      </div>
      <div v-else>
        가맹 정보가 존재하지 않습니다.
      </div>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button id="open-create-campg" @click="() => isModalOpen = true" :disabled="!op.isFranchiseePresent()"> 추가
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-card-content>
    <basic :isModalOpen="isModalOpen" @clickCancel="onClickCancel" @clickAccept="onClickAccept"></basic>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonToolbar, IonCard, IonAlert, alertController, ToggleCustomEvent,
  IonCardHeader, IonCardTitle, IonCardContent,
  IonToggle, IonButtons, IonButton, IonList, IonItem
} from '@ionic/vue';
import { ToggleChangeEventDetail } from '@ionic/vue';
import { useOperator } from '@/stores/operatorStore';
import Basic from './campgroundCreate/Basic.vue';
import Campground from '@/assets/ts/interfaces/Campground';

const isModalOpen = ref(false)
const op = useOperator()
const campgToggled = ref<null | Campground>(null)

function onClickCancel() {
  isModalOpen.value = false
}
function onClickAccept() {
  isModalOpen.value = false
}
function onToggleClick(campg: Campground) {
  campgToggled.value = campg
}
async function onToggle(ev: ToggleCustomEvent) {
  const campg = campgToggled.value!
  campgToggled.value = null
  // 토글시 워닝
  if (ev.detail.checked) {
    // 이 시점에서 isToggleChecked 는 아직 true 로 업데이트 되지 않았음
    // cancel 을 올바르게 처리하기 위해 앞서 값을 변경해야 함
    campg.isActivated = true
    const alert = await alertController.create({
      header: '캠프그라운드 활성화',
      message: `캠프그라운드 "${campg.name}" 을 활성화 합니다.
      활성화 이후 유저가 캠프 사이트를 예약할 수 있습니다.
      활성화 하기 전 캠프 사이트의 상세 정보와 활성화 여부를 다시한번 확인하세요.`,
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            campg.isActivated = false
          }
        },
        {
          text: '활성화',
          role: 'confirm',
          handler: () => {
            campg.isActivated = true
            console.log('campground activation callback')
          },
        },
      ]
    })
    await alert.present();
  } else {
    campg.isActivated = false
    const alert = await alertController.create({
      header: '캠프그라운드 비활성화',
      message: `캠프그라운드 "${campg.name}" 을 비활성화 합니다.
      이후 해당 캠프그라운드는 사용자에게 노출되지 않으며 예약을 받을 수 없습니다.
      비활성화에 앞서 생성된 예약은 자동 취소되지 않습니다.`,
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            campg.isActivated = true
          }
        },
        {
          text: '비활성화',
          role: 'confirm',
          handler: () => {
            campg.isActivated = false
            console.log('campground deactivation callback')
          },
        },
      ]
    })
    await alert.present();
  }
}
</script>
