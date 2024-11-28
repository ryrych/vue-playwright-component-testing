<script setup lang="ts">
import { ref, defineExpose, watch, nextTick } from 'vue';
import MyButton from '@/components/myButton/myButton.vue';

const props = defineProps({
  target: {
    type: String,
    default: '#modals',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineExpose({
  open,
});

const modal = ref();

const isOpen = ref(false);
function open() {
  isOpen.value = true;
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (!!isOpen) {
      open();
    }
  },
  { immediate: true },
);
</script>

<template>
  <Teleport to="#modals">
    <dialog
      v-if="isOpen"
      class="inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      :class="[isOpen ? 'fixed' : 'hidden']" ref="modal" data-test="myModal">
      <div class="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-slate-200 shadow-sm text-slate-800">
        <h3 class="flex shrink-0 items-center pb-4 text-xl font-medium">Cześć!</h3>
        <p class="py-4">
          <slot> To jest przykładowy modal </slot>
        </p>
        <div class="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
          <form method="dialog">
            <myButton @click="isOpen = false" label="Zamknij" />
          </form>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
