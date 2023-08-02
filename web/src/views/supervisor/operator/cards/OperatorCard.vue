<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        지기
      </ion-card-title>
      <ion-card-subtitle>
        지기 정보 수정
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-item button
                @click="toEdit = true">
        <ion-label>
          {{ props.operator.nickname }}
        </ion-label>
      </ion-item>
      <create-edit-modal v-if="toEdit"
                         :item="props.operator"
                         :is-before-edit="true"
                         :item-name="(i: Operator) => i.name"
                         @click-cancel="toEdit = false"
                         @click-accept="item => onClickAccept(item)"
                         @click-delete="item => onClickDelete(item)"
                         #default="{ item, isBeforeEdit }">
        <operator-form :operator="item" :readonly="isBeforeEdit" :is-init="false"></operator-form>
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
import OperatorForm from '../forms/OperatorForm.vue'
import { useOperator } from '@/stores/operatorStore'
import type Operator from '@/assets/ts/interfaces/Operator'

const props = defineProps<{
  operator: Operator
}>()
const router = useRouter()
const operator = useOperator()
const toEdit = ref(false)

function onClickAccept(item: Operator) {
  operator.registerOperator(item)
  toEdit.value = false
}

function onClickDelete(item: Operator) {
  operator.deleteOperator(item)
  toEdit.value = false
  router.push({ name: 'operator' })
}
</script>
