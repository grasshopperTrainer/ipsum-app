<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          가맹점 관리
        </ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  IonPage, IonContent,
  IonHeader, IonToolbar, IonTitle, IonRouterOutlet, IonButtons, IonBackButton,
  IonMenuButton
} from '@ionic/vue'

</script>
