<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          관리
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title> 캠프그라운드 </ion-card-title>
          <ion-card-subtitle> 사업장 편집 </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <div v-if="isCampgEmpty">
            캠프그라운드가 존재하지 않습니다.
          </div>
          <div v-else>
            ddd
          </div>
          <ion-toolbar class="tb">
            <ion-buttons slot="primary">
              <ion-button fill="outline"> 더하기 </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

const campgList = ref<string[]>([])
const isCampgEmpty = computed(() => {
  return campgList.value == null || campgList.value.length == 0
})
</script>

<style scoped>
.tb {
  --background: rgb(255,255,255,0); 
}
</style>
