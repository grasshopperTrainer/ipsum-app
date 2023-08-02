<template>
  <div>
    <ion-split-pane when="sm"
                    content-id="main">
      <ion-menu content-id="main">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              supervisor
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button
                      :router-link="{ name: 'operator' }">
              <ion-label> 캠프지기 관리 </ion-label>
            </ion-item>
            <ion-item button
                      :router-link="{ name: 'franchisee' }">
              <ion-label> 가맹점 관리 </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main"></ion-router-outlet>

    </ion-split-pane>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  IonPage, IonContent,
  IonHeader, IonToolbar, IonTitle, IonText,
  IonList, IonItem, IonLabel,
  IonButtons, IonButton,
  IonSplitPane, IonMenu, IonMenuButton, IonMenuToggle,
  IonRouterOutlet
} from '@ionic/vue'

</script>
