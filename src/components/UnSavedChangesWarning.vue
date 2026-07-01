<script lang="ts" setup>
const unSavedChanges = defineModel<boolean>()
</script>

<template>
  <div
    v-if="unSavedChanges"
    class="p-4 bg-white border rounded-full border-brand-100 shadow-sm mb-6 fixed left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center justify-center"
  >
    <p class="text-red-600 text-[0.95rem] font-semibold">
      Имате незапазени промени. Ако напуснете страницата, те ще бъдат загубени.
    </p>
  </div>
</template>
