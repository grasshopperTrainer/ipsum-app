<template>
  <ion-page>
    <ion-router-outlet></ion-router-outlet>

    <ion-header>
      <ion-toolbar>
        <ion-title>
          stayout campground
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="container">
        <ion-button :router-link="{ name: 'supervisor' }">
          관리자 앱으로 이동
        </ion-button>
        <ion-button>
          운영자 앱으로 이동
        </ion-button>
        <ion-button>
          사용자 앱으로 이동
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonRouterOutlet } from '@ionic/vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  width: 50%;
  transform: translate(50%, -50%);

}
</style>