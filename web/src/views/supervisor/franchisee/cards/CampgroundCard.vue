<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title> 캠프그라운드 </ion-card-title>
      <ion-card-subtitle> 사업장 정보 생성, 수정</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div v-if="franch.isCampgroundPresent(props.franchisee.id!)">
        <ion-list>
          <ion-item-toggle v-for="campg in props.franchisee.campgrounds" button
                           :toggle-checked="campg.isActive"
                           @click-toggle="onClickToggle(campg)"
                           @click-item="toCreateEdit = campg">
            {{ campg.name }}
          </ion-item-toggle>
        </ion-list>
      </div>
      <div v-else>
        캠프그라운드가 존재하지 않습니다. 캠프그라운드를 추가하세요.
      </div>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <sandbox>
            <ion-button @click="() => toCreateEdit = franch.createCampground(props.franchisee.id!)">
              추가
            </ion-button>
          </sandbox>
          <ion-button @click="() => toCreateEdit = franch.createCampground(props.franchisee.id!)">
            추가
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-card-content>
    <create-edit-modal v-if="toCreateEdit != null"
                       :item="toCreateEdit!"
                       :is-before-edit="toCreateEdit!.id != null"
                       :item-name="(i: Campground) => i.name"
                       @click-cancel="toCreateEdit = null"
                       @click-accept="item => { franch.registerCampground(item); toCreateEdit = null }"
                       @click-delete="item => { franch.deleteCampground(item); toCreateEdit = null }"
                       #default="{ item, isBeforeEdit }">
      <campground-form :campground="item" :readony="isBeforeEdit"></campground-form>
    </create-edit-modal>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonToolbar, IonCard, alertController,
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButtons, IonButton, IonList
} from '@ionic/vue'
import { useFranchisee } from '@/stores/franchiseeStore'
import CreateEditModal from '@/components/CreateEditModal.vue'
import IonItemToggle from '@/components/IonItemToggle.vue'
import Sandbox from '@/components/Sandbox.vue'
import CampgroundForm from '../forms/CampgroundForm.vue'
import type Campground from '@/assets/ts/interfaces/Campground'
import type Franchisee from '@/assets/ts/interfaces/Franchisee'

const props = defineProps<{
  franchisee: Franchisee
}>()
const franch = useFranchisee()
const toCreateEdit = ref<null | Campground>(null)

async function onClickToggle(campg: Campground) {
  // 토글시 워닝
  if (!campg.isActive) {
    // 임시값으로 변경하지 않을시 정상 처리되지 않음
    campg.isActive = null as any as false
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
            campg.isActive = false
          }
        },
        {
          text: '활성화',
          role: 'confirm',
          handler: () => {
            campg.isActive = true
            console.log('campground activation callback')
          },
        },
      ]
    })
    await alert.present()
  } else {
    campg.isActive = null as any as false
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
            campg.isActive = true
          }
        },
        {
          text: '비활성화',
          role: 'confirm',
          handler: () => {
            campg.isActive = false
            console.log('campground deactivation callback')
          },
        },
      ]
    })
    await alert.present()
  }
}
</script>
