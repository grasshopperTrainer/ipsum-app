<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        캠프사이트 목록
      </ion-card-title>
      <ion-card-subtitle>
        개별 캠프사이트 추가
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list v-if="campsiteGroup.campsites.length != 0">
        <template v-for="camps in campsiteGroup.campsites">
          <ion-item-toggle button
                           :readonly="props.readonly"
                           @click-item="() => toCreateEdit = camps"
                           @click-toggle="() => console.log('toggle')">
            {{ camps.name }}
          </ion-item-toggle>
        </template>
      </ion-list>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button id="creaet-camps-alert"
                      :disabled="props.readonly"> 추가 </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-alert trigger="creaet-camps-alert"
                 header="캠프사이트 추가"
                 sub-header="개별 캠프사이트 추가"
                 :buttons="createCampsiteAlertButtons"
                 :inputs="createCampsiteAlertInputs"></ion-alert>
    </ion-card-content>
    <create-edit-modal v-if="toCreateEdit != null"
                       :item="toCreateEdit"
                       :is-before-edit="toCreateEdit!.id != null"
                       @clickCancel="toCreateEdit = null"
                       @clickAccept="camps => { franch.registerCampsite(camps, campsiteGroup); toCreateEdit = null }"
                       @clickDelete="camps => { franch.deleteCampsite(camps, campsiteGroup); toCreateEdit = null }"
                       #default="{ item, isBeforeEdit }">
      <campsite-form :campsite="item"
                     :readonly="isBeforeEdit">
      </campsite-form>
    </create-edit-modal>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import {
  IonToolbar,
  IonList,
  IonButtons, IonButton,
  IonAlert, AlertInput,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/vue'
import { useFranchisee } from '@/stores/franchiseeStore'
import type CampsiteGroup from '@/assets/ts/interfaces/CampsiteGroup'
import type Campsite from '@/assets/ts/interfaces/Campsite'
import IonItemToggle from '@/components/IonItemToggle.vue'
import CreateEditModal from '@/components/CreateEditModal.vue'
import CampsiteForm from '../forms/CampsiteForm.vue'
const props = defineProps<{
  readonly: boolean
  campsiteGroup: CampsiteGroup
}>()

const toCreateEdit = ref<Campsite | null>(null)
// create, edit 상황에 따라 초기 값을 달리함
const franch = useFranchisee()
const campsiteGroup = toRef(props.campsiteGroup)
const merits = ref(campsiteGroup.value.merits)

watch(merits, () => {
  console.log('new merits ', merits)
})

const createCampsiteAlertButtons = [
  {
    text: '취소',
    role: 'cancel'
  },
  {
    text: '확인',
    role: 'accept',
    handler: (inputs: { [k: string]: string }) => {
      let i = 0
      const names = new Set(campsiteGroup.value.campsites.map(x => x.name))
      for (const _ of new Array(Number(inputs.numCampsites)).keys()) {
        const camps = franch.createCampsite(campsiteGroup.value.id!)
        // TODO: 임시로 중복되는 이름 없도록 확인, 추후 api 가 제공할 것?
        let name
        while (true) {
          name = campsiteGroup.value.name + '_' + String(i)
          if (!names.has(name)) {
            names.add(name)
            break
          }
          i += 1
        }
        camps.name = name
        camps.campsiteGroupId = campsiteGroup.value.id
        franch.registerCampsite(camps, campsiteGroup.value)
      }
    }
  }
]

const createCampsiteAlertInputs: AlertInput[] = [
  {
    type: 'number',
    name: 'numCampsites',
    placeholder: '캠프사이트 개수',
    min: 1,
    max: 999
  }
]
</script>
