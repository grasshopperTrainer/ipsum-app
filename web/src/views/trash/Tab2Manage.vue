<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> 관리 </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <campsite-info-card></campsite-info-card>
      <campground-info-card></campground-info-card>
      <franchisee-info-card></franchisee-info-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import FranchiseeInfoCard from '@/views/manage/FranchiseeCard.vue'
import CampgroundInfoCard from '@/views/manage/CampgroundCard.vue'
import CampsiteInfoCard from '@/views/manage/CampsiteCard.vue'
</script>
