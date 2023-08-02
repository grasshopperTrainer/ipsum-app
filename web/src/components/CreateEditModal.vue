<template>
  <ion-modal :is-open="true">
    <slot :is-before-edit="isBeforeEdit" :item="itemTemp"></slot>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="onClickCancel"> 취소 </ion-button>
        </ion-buttons>
        <ion-buttons v-if="isBeforeEdit" slot="primary">
          <ion-button id="delete-alert"
                      @click="onClickDelete"> 삭제 </ion-button>
          <ion-alert header="삭제"
                     :is-open="isAlertOpen"
                     :message="`${itemName} 을/를 삭제합니다`"
                     :buttons="alertButtons"></ion-alert>
          <ion-button @click="onClickEdit"> 편집 </ion-button>
        </ion-buttons>
        <ion-buttons v-else slot="primary">
          <ion-button @click="onClickAccept"> 완료 </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import { IonModal, IonFooter, IonToolbar, IonButtons, IonButton, IonAlert } from '@ionic/vue'

const props = withDefaults(defineProps<{
  item: { [key: string]: any }
  itemName?: Function | string
  isBeforeEdit?: boolean
  alertDelete?: boolean
}>(), {
  isBeforeEdit: true,
  alertDelete: true
})
// 부모가 본 컴포넌트를 v-if 로 mount/unmount 하므로 아래 초기화가 항상 실행됨
const itemTemp = ref(JSON.parse(JSON.stringify(props.item)))
const isBeforeEdit = toRef(props.isBeforeEdit)
const isAlertOpen = ref(false)

const emit = defineEmits<{
  (e: 'closeModal'): void
  (e: 'clickCancel'): void
  (e: 'clickDelete', item: any): void
  (e: 'clickAccept', item: any): void
}>()

const itemName = computed(() => {
  if (typeof props.itemName == 'string') {
    return props.itemName
  } else if (typeof props.itemName == 'function') {
    return (props.itemName as Function)(props.item)
  } else if ('text' in props.item) {
    return props.item.text
  }
})
const alertButtons = [
  {
    text: '취소',
    role: 'cancel',
    handler: () => isAlertOpen.value = false
  },
  {
    text: '삭제',
    role: 'confirm',
    handler: emitDelete,
  },
]
function emitDelete() {
  isAlertOpen.value = false
  isBeforeEdit.value = false
  emit('clickDelete', props.item)
}
function onClickDelete() {
  if (props.alertDelete) {
    isAlertOpen.value = true
  } else {
    emitDelete()
  }
}
function onClickAccept() {
  emit('clickAccept', itemTemp.value)
  isBeforeEdit.value = false
}
function onClickCancel() {
  emit('clickCancel')
  isBeforeEdit.value = false
}
function onClickEdit() {
  isBeforeEdit.value = false
}
</script>

<style scoped></style>
