<script setup lang="ts">
import type { Prop, PropType } from "vue";

import { ChevronIconDirection } from "./ChevronIcon.vue";
import ChevronIcon from "./ChevronIcon.vue";

import { ButtonStyle } from "./Button.vue";
import Button from "./Button.vue";
</script>

<template>
  <div class="vertical-layout
    white-background
    medium-border-radius
    medium-shadow">
      <div @click="$emit('toggle', accordionOrder)" 
        class="horizontal-layout
        extra-large-vertical-padding
        large-horizontal-padding
        medium-gap
        non-text-clickable">
        <div class="fill-space
          key-text">
          Step {{ accordionOrder + 1 }}: {{ title }}
        </div>
        <ChevronIcon 
            :direction="ACCORDION_STATE_TO_CHEVRON_ICON_DIRECTION[state]">
        </ChevronIcon>
      </div>
      <div v-show="ACCORDION_STATE_TO_SHOW_CONTENT_BOOLEAN[state]"
        class="large-horizontal-padding">
        <slot></slot>
      </div>
      <div v-show="ACCORDION_STATE_TO_SHOW_CONTENT_BOOLEAN[state] && completeButtonText"
        class="horizontal-layout
        primary-right
        small-gap
        large-horizontal-padding
        small-top-padding
        medium-bottom-padding">
        <Button v-if="showSkipButton"
          @buttonClicked="$emit('skip', accordionOrder)"
          :buttonStyle="ButtonStyle.SECONDARY"
          text="Skip"></Button>
        <Button v-if="completeButtonText"
          @buttonClicked="$emit('complete', accordionOrder)"
          :buttonStyle="ButtonStyle.PRIMARY"
          :text="completeButtonText"></Button>
      </div>
  </div>
</template>

<script lang="ts">
export enum AccordionState {
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
    state: {
      type: Number as PropType<AccordionState>,
      required: true
    },
    accordionOrder: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    completeButtonText: {
      type: String,
      required: false
    },
    showSkipButton: Boolean
  },
  emits: ["complete", "skip", "toggle"]
};
</script>