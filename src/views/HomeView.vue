<script setup lang="ts">
import MyModal from '@/components/myModal/myModal.vue';
import MyButton from '@/components/myButton/myButton.vue';
import { ref } from 'vue';

const modal = ref();

function openModal() {
  modal.value.open();
}
</script>

<template>
  <main>
    <MyButton
      @click="openModal"
      label="Otwórz okno dialogowe"
    />
    <MyModal
      ref="modal"
      :isOpen="false"
    >
      Jak się masz?
    </MyModal>
  </main>
</template>
