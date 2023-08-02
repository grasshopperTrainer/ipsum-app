<template>
  <ion-page>
    <ion-content>
      <franchisee-card :franchisee="franchisee!"></franchisee-card>
      <campground-card :franchisee="franchisee!"></campground-card>
      <campsite-group-card :franchisee="franchisee!"></campsite-group-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent,
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { useFranchisee } from '@/stores/franchiseeStore'

import FranchiseeCard from './cards/FranchiseeCard.vue'
import CampgroundCard from './cards/CampgroundCard.vue'
import CampsiteGroupCard from './cards/CampsiteGroupCard.vue'


const router = useRouter()
const franch = useFranchisee()
const route = router.currentRoute
const franchId = Number(route.value.params.id)
const franchisee = franch.getFranchisee(franchId)

</script>
