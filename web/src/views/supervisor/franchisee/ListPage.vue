<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title> 가맹점 목록 </ion-card-title>
          <ion-card-subtitle> 가맹 정보 추가, 삭제, 편집 </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list v-if="franch.franchisees.length != 0"
                    v-for="_franch in franch.franchisees">
            <ion-item button
                      :router-link="{ name: 'franchiseeDetail', params: { id: _franch.id } }">
              <ion-label>
                {{ _franch.companyName }}
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-item v-else>
            <ion-label>
              가맹 정보가 없습니다. 가맹 정보를 추가하세요.
            </ion-label>
          </ion-item>
          <ion-toolbar>
            <ion-buttons slot="primary">
              <ion-button @click="openModal">
                생성
              </ion-button>
            </ion-buttons>
            <create-edit-modal v-if="toCreateFranchisee"
                               :item="franch.createFranchisee()"
                               :is-before-edit="false"
                               :item-name="(i: Franchisee) => i.companyName"
                               @click-cancel="toCreateFranchisee = false"
                               @click-accept="(item: Franchisee) => { franch.registerFranchisee(item); toCreateFranchisee = false }"
                               #default="{ item }">
              <franchisee-form :franchisee="item" :readonly="false"></franchisee-form>
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
import FranchiseeForm from './forms/FranchiseeForm.vue'
import Franchisee from '@/assets/ts/interfaces/Franchisee'
import { useFranchisee } from '@/stores/franchiseeStore'

const toCreateFranchisee = ref(false)
const franch = useFranchisee()

function openModal() {
  toCreateFranchisee.value = true
}

</script>
