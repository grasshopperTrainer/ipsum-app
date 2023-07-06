<template>
  <ion-list>
    <ion-item-group>
      <template v-for="meritGroup in meritGroups">
        <ion-item-divider>
          {{ meritGroup.text }}
        </ion-item-divider>
        <horizontal-list :keys="meritGroup.merits.map(x => x.value)">
          <template v-for="merit in meritGroup.merits" #[merit.value]>
            <div class="icon-with-title">
              <div>
                <ion-button fill="clear"
                            color="light"
                            :disabled="props.readonly"
                            @click="onClickIcon(meritGroup, merit as Merit)">
                  <ion-icon :icon="merit.icon" :class="{'merit-button': merit.isActive}"></ion-icon>
                </ion-button>
                <div class="icon-title">{{ merit.text }}</div>
              </div>
            </div>
          </template>
        </horizontal-list>
      </template>
    </ion-item-group>
  </ion-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonList, IonItemGroup, IonItemDivider,
  IonIcon, IonButton
} from '@ionic/vue'
import { useFranchisee } from '@/stores/franchiseeStore'
import HorizontalList from '@/components/HorizontalList.vue'
import type Merit from '@/assets/ts/interfaces/Merit'
import type MeritGroup from '@/assets/ts/interfaces/MeritGroup'

const props = defineProps<{
  readonly: boolean
  modelValue: MeritGroup[]
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', merits: MeritGroup[]): void
}>()
const franch = useFranchisee()

const meritGroups = ref<MeritGroup[]>(franch.getMerits())
initSelectedMerits()
function initSelectedMerits() {
  for (const group of props.modelValue) {
    const theGroup = meritGroups.value.filter(x => x.value == group.value)[0]
    if (theGroup == null) {
      meritGroups.value.push(group)
    } else {
      for (const merit of group.merits) {
        const theMerit = theGroup.merits.filter(x => x.value == merit.value)[0]
        if (theMerit == null) {
          theGroup.merits.push(merit)
        } else {
          theMerit.isActive = merit.isActive
        }
      }
    }
  }
}

function onClickIcon(meritGroup: MeritGroup, merit: Merit) {
  if (meritGroup.selectionRule == 'SINGLE') {
    if (merit.isActive) {
      merit.isActive = false
    } else {
      meritGroup.merits.forEach(x => x.isActive = false)
      merit.isActive = true
    }
  } else { // == 'MULTIPLE'
    merit.isActive = !merit.isActive
  }
  emit('update:modelValue', meritGroups.value)
}
</script>

<style scoped>
.icon-with-title {
  text-align: center;
}

.icon-title {
  font-size: 10px;
}

ion-icon {
  font-size: 52px;
}
.merit-button {
  color: blue;
}
</style>
