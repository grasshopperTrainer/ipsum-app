<template>
  <ion-modal :is-open="props.isModalOpen">
  <ion-header>
    <ion-toolbar>
      <ion-title>
        캠프그라운드 추가
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
        <ion-input label="이름" v-model="campg.name" placeholder=""></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="주소" v-model="campg.address" placeholder=""></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="전화번호" v-model="campg.phoneNumber" placeholder=""></ion-input>
      </ion-item>
    </simple-ion-list>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button @click="onClickCancel"> 취소 </ion-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-nav-link router-direction="forward" :component="Groups">
          <ion-button @click="onClickAccept"> 완료 </ion-button>
        </ion-nav-link>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonHeader, IonFooter, IonToolbar, IonTitle, IonContent, IonModal } from '@ionic/vue'
import { IonButtons, IonButton } from '@ionic/vue';
import { IonInput } from '@ionic/vue'
import { IonListHeader, IonItem, IonLabel } from '@ionic/vue'
import { IonNavLink } from '@ionic/vue'
import SimpleIonList from '@/components/SimpleIonList.vue';
import { useOperator } from '@/stores/operatorStore';
import Groups from '@/views/campgroundCreate/Groups.vue'
import type Campground from '@/assets/ts/interfaces/Campground'


const props = defineProps<{
  isModalOpen: boolean
}>()
const emit = defineEmits<{
  (e: 'clickCancel'): void
  (e: 'clickAccept'): void
}>()
const op = useOperator()

const campg = ref<Campground>({isActivated: false} as Campground)

function resetCampg() {
  campg.value = {isActivated: false} as Campground
}

function onClickAccept() {
  op.campgrounds.push(JSON.parse(JSON.stringify(campg.value)))
  resetCampg()
  emit('clickAccept')
}

function onClickCancel() {
  campg.value = {} as Campground
  resetCampg()
  emit('clickCancel')
}

</script>
