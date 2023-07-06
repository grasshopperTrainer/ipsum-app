<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title> 캠프사이트 </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div v-if="!franch.isCampgroundPresent(props.franchisee.id!)">
        캠프그라운드가 존재하지 않습니다. 캠프그라운드를 추가하세요.
      </div>
      <div v-else-if="!franch.isCampsiteGroupPresent(props.franchisee.id!)">
        캠프사이트가 존재하지 않습니다. 캠프사이트를 추가하세요.
      </div>
      <div v-else>
        <ion-list>
          <template v-for="campg in props.franchisee.campgrounds">
            <IonItemDivider>
              {{ campg.name }}
            </IonItemDivider>
            <ion-item-toggle v-for="campsGroup in campg.campsiteGroups"
                             button
                             :toggle-checked="campsGroup.isActive"
                             @click-toggle="onClickToggle(campsGroup)"
                             @click-item="toCreateEdit = campsGroup">
              {{ campsGroup.name }}
            </ion-item-toggle>
          </template>
        </ion-list>
      </div>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <sandbox>
            <ion-button @click="() => toCreateEdit = franch.createCampsiteGroup(null)"> 추가 </ion-button>
          </sandbox>
          <ion-button @click="() => toCreateEdit = franch.createCampsiteGroup(null)"
                      :disabled="!(franch.isCampgroundPresent(props.franchisee.id!))"> 추가 </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-card-content>
    <create-edit-modal v-if="toCreateEdit != null"
                       :item="toCreateEdit"
                       :is-before-edit="toCreateEdit!.id != null"
                       @clickCancel="toCreateEdit = null"
                       @clickAccept="campsGroup => { franch.registerCampsiteGroup(campsGroup); toCreateEdit = null }"
                       @clickDelete="campsGroup => { franch.deleteCampsiteGroup(campsGroup); toCreateEdit = null}"
                       #default="{ item, isBeforeEdit }">
      <campsite-group-form :franchisee="props.franchisee"
                           :campsite-group="item"
                           :readony="isBeforeEdit">
      </campsite-group-form>
    </create-edit-modal>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonItemDivider, IonToolbar } from '@ionic/vue'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonToggle, IonLabel } from '@ionic/vue'
import { IonButtons, IonButton } from '@ionic/vue'
import { useFranchisee as useFranchisee } from '@/stores/franchiseeStore'
import IonItemToggle from '@/components/IonItemToggle.vue'
import CreateEditModal from '@/components/CreateEditModal.vue'
import Sandbox from '@/components/Sandbox.vue'
import CampsiteGroupForm from '../forms/CampsiteGroupForm.vue'
import type CampsiteGroup from '@/assets/ts/interfaces/CampsiteGroup'
import type Franchisee from '@/assets/ts/interfaces/Franchisee'

const props = defineProps<{
  franchisee: Franchisee
}>()
const franch = useFranchisee()
const campsToggled = ref<null | CampsiteGroup>(null) // toggle 대상
const toCreateEdit = ref<null | CampsiteGroup>(null)

function onClickToggle(campsGroup: CampsiteGroup) {
  console.log('onToggle', campsGroup)
  campsToggled.value = campsGroup
}
</script>
