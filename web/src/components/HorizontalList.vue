<template>
  <div class="horizontal-list">
    <div class="horizontal-list-item" v-for="key in props.keys">
      <slot :name="key"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  keys: string[]
}>();
</script>

<style scoped>
.horizontal-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll !important;
}
</style>
