<script setup lang="ts">
import { ChevronIconDirection } from "./ChevronIcon.vue";
import ChevronIcon from "./ChevronIcon.vue";
</script>

<template>
  <div class="vertical-layout
    white-background
    large-horizontal-padding
    medium-vertical-padding
    medium-border-radius">
      <div class="horizontal-layout
        large-vertical-padding
        medium-gap">
        <div class="fill-space
          key-text">
          Step {{ stepNumber }}: {{ title }}
        </div>
        <ChevronIcon 
            :direction="ACCORDION_STATE_TO_CHEVRON_ICON_DIRECTION[accordionState]">
        </ChevronIcon>
      </div>
      <div>
        <slot></slot>
      </div>
  </div>
</template>

<script lang="ts">
enum AccordionState {
    OPEN,
    CLOSED
};

const ACCORDION_STATE_TO_CHEVRON_ICON_DIRECTION = {
  [`${AccordionState.CLOSED}`]: ChevronIconDirection.DOWN,
  [`${AccordionState.OPEN}`]: ChevronIconDirection.UP
};

export default {
  name: "accordion",
  props: {
    stepNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
        accordionState: AccordionState.CLOSED as AccordionState 
    }
  }
};
</script>