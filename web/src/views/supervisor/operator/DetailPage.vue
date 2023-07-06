<template>
  <ion-page>
    <ion-content>
      <operator-card :operator="operator!"></operator-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent,
} from '@ionic/vue'
import { useRoute } from 'vue-router'
import OperatorCard from './cards/OperatorCard.vue'
import { useOperator } from '@/stores/operatorStore'

const oper = useOperator()
const operator = oper.getOperator(Number(useRoute().params.id))

</script>
