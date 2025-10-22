<script setup lang="ts">
import { ChevronIconDirection } from "./ChevronIcon.vue";
import ChevronIcon from "./ChevronIcon.vue";
</script>

<template>
  <div class="vertical-layout
    white-background
    medium-border-radius">
      <div @click="toggleAccordionState" 
        class="horizontal-layout
        extra-large-vertical-padding
        large-horizontal-padding
        medium-gap
        non-text-clickable">
        <div class="fill-space
          key-text">
          Step {{ stepNumber }}: {{ title }}
        </div>
        <ChevronIcon 
            :direction="ACCORDION_STATE_TO_CHEVRON_ICON_DIRECTION[accordionState]">
        </ChevronIcon>
      </div>
      <div v-if="ACCORDION_STATE_TO_SHOW_CONTENT_BOOLEAN[accordionState]"
        class="large-horizontal-padding">
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

const ACCORDION_STATE_TO_SHOW_CONTENT_BOOLEAN = {
  [`${AccordionState.CLOSED}`]: false,
  [`${AccordionState.OPEN}`]: true
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
  },
  methods: {
    toggleAccordionState: function () {
      if (this.accordionState == AccordionState.CLOSED) this.accordionState = AccordionState.OPEN;
      else if (this.accordionState == AccordionState.OPEN) this.accordionState = AccordionState.CLOSED;
    }
  }
};
</script>