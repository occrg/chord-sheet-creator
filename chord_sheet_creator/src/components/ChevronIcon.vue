<script lang="ts" setup>
import type { PropType } from "vue";
</script>

<template>
  <div class="vertical-middle">
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L14 14L26 2" stroke="#3F1E00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  </div>
</template>

<script lang="ts">
export enum ChevronIconDirection {
    UP,
    DOWN
}

export default {
  name: "chevron-icon",
  props: {
    direction: {
      type: Number as PropType<ChevronIconDirection>,
      required: true
    }
  }
};
</script>