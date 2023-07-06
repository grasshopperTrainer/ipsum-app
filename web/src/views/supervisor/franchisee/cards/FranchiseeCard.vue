<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        가맹점
      </ion-card-title>
      <ion-card-subtitle>
        가맹 정보 수정
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-item button
                @click="toEditFranchisee = true">
        <ion-label>
          {{ props.franchisee.companyName }}
        </ion-label>
      </ion-item>
      <create-edit-modal v-if="toEditFranchisee"
                         :item="props.franchisee"
                         :is-before-edit="true"
                         :item-name="(i: Franchisee) => i.companyName"
                         @click-cancel="toEditFranchisee = false"
                         @click-accept="item => onClickAccept(item)"
                         @click-delete="item => onClickDelete(item)"
                         #default="{ item, isBeforeEdit }">
        <franchisee-form :franchisee="item" :readonly="isBeforeEdit"></franchisee-form>
      </create-edit-modal>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonLabel
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import CreateEditModal from '@/components/CreateEditModal.vue'
import FranchiseeForm from '../forms/FranchiseeForm.vue'
import { useFranchisee } from '@/stores/franchiseeStore'
import type Franchisee from '@/assets/ts/interfaces/Franchisee'

const props = defineProps<{
  franchisee: Franchisee
}>()
const router = useRouter()
const franch = useFranchisee()
const toEditFranchisee = ref(false)

function onClickAccept(item: Franchisee) {
  franch.registerFranchisee(item)
  toEditFranchisee.value = false
}

function onClickDelete(item: Franchisee) {
  franch.deleteFranchisee(item)
  toEditFranchisee.value = false
  router.push({ name: 'franchisee' })
}
</script>
