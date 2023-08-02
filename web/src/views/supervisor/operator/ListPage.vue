<template>
  <ion-page>
    <ion-content>

      <ion-card>
        <ion-card-header>
          <ion-card-title> 캠프지기 목록 </ion-card-title>
          <ion-card-subtitle> 캠프지기 계정 추가, 삭제, 편집 </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list v-if="operator.operators.length != 0"
                    v-for="_oper in operator.operators">
            <ion-item button
                      :router-link="{ name: 'operatorDetail', params: { id: _oper.id } }">
              <ion-label>
                {{ _oper.nickname }}
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-item v-else>
            <ion-label>
              캠프지기 정보가 존재하지 않습니다
            </ion-label>
          </ion-item>
          <ion-toolbar>
            <ion-buttons slot="primary">
              <ion-button @click="openModal">
                생성
              </ion-button>
            </ion-buttons>
            <create-edit-modal v-if="toCreate"
                               :item="operator.createOperator()"
                               :is-before-edit="false"
                               :item-name="(i: Operator) => i.name"
                               @click-cancel="toCreate = false"
                               @click-accept="(item: Operator) => { operator.registerOperator(item); toCreate = false }"
                               #default="{ item }">
              <operator-form :operator="item" :readonly="false" :is-init="true"></operator-form>
            </create-edit-modal>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonPage, IonHeader, IonContent, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
  IonList, IonItem, IonLabel,
  IonButtons, IonButton,
} from '@ionic/vue'
import CreateEditModal from '@/components/CreateEditModal.vue'
import OperatorForm from './forms/OperatorForm.vue'
import Operator from '@/assets/ts/interfaces/Operator'
import { useOperator } from '@/stores/operatorStore'

const toCreate = ref(false)
const operator = useOperator()

function openModal() {
  toCreate.value = true
}

</script>
