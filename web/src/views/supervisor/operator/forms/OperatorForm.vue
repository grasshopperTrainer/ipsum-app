<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        운영자 편집
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <simple-ion-list :inset="true">
      <ion-list-header>
        <h1>
          계정 정보
        </h1>
      </ion-list-header>
      <ion-item>
        <ion-input label="닉네임"
                   placeholder=""
                   v-model="props.operator.nickname"
                   :readonly="props.readonly || !props.isInit"></ion-input>
      </ion-item>
      <ion-item v-if="props.isInit">
        <ion-input label="비밀번호"
                   :placeholder="props.operator.nickname"
                   v-model="props.operator.password"
                   :readonly="true"></ion-input>
        <ion-note>
          초기 비밀번호는 닉네임과 같습니다
        </ion-note>
      </ion-item>
      <ion-item>
        <readonlyable-select label="역활"
                             interface="popover"
                             placeholder="캠프지기의 역활 선택"
                             :readonly="props.readonly"
                             :readonly-text="props.operator.role.text"
                             :items=oper.getRoles()
                             @ionChange="(item: Role) => props.operator.role = item"
                             #default="{ item }">
          {{ item.text }}
        </readonlyable-select>
      </ion-item>
      <ion-item :disabled="true">
        <ion-label slot="end">
          {{ props.operator.role.description }}
        </ion-label>
      </ion-item>
      <ion-item>
        <readonlyable-select label="가맹점"
                             interface="popover"
                             placeholder="소속 가맹점 선택"
                             :readonly="props.readonly"
                             :readonly-text="props.operator.franchisees.length == 0 ? '' : props.operator.franchisees[0].companyName"
                             :items="franch.franchisees"
                             @ionChange="(item: Franchisee) => props.operator.franchisees = [item]"
                             #default="{ item }">
          {{ item.companyName }}
        </readonlyable-select>
      </ion-item>

    </simple-ion-list>

    <simple-ion-list :inset="true">

      <ion-list-header>
        <h1>
          가입자 정보
        </h1>
      </ion-list-header>
      <ion-item>
        <ion-input label="이름"
                   placeholder=""
                   v-model="props.operator.name"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="전화번호"
                   placeholder=""
                   v-model="props.operator.phoneNumber"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="이메일"
                   placeholder=""
                   v-model="props.operator.email"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="주소"
                   placeholder=""
                   v-model="props.operator.address"
                   :readonly="props.readonly"></ion-input>
      </ion-item>
    </simple-ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonListHeader, IonItem, IonLabel, IonNote, IonInput,
  IonSelect, IonSelectOption
} from '@ionic/vue'
import Operator from '@/assets/ts/interfaces/Operator'
import SimpleIonList from '@/components/SimpleIonList.vue'
import ReadonlyableSelect from '@/components/ReadonlyableSelect.vue'
import { useOperator } from '@/stores/operatorStore'
import { useFranchisee } from '@/stores/franchiseeStore'
import type Role from '@/assets/ts/interfaces/Role'
import Franchisee from '@/assets/ts/interfaces/Franchisee'
const props = defineProps<{
  operator: Operator
  readonly: boolean
  isInit: boolean
}>()

const oper = useOperator()
const franch = useFranchisee()
</script>
