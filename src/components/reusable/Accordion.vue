<script setup lang="ts">
import type { Prop, PropType } from "vue";

import { IconChoice, IconSize } from "./Icon.vue";
import Icon from "./Icon.vue";

import { ButtonStyle } from "./Button.vue";
import Button from "./Button.vue";
</script>

<template>
  <div class="vertical-layout
    white-background
    medium-border-radius
    medium-vertical-padding
    large-horizontal-padding
    medium-shadow">
      <div @click="$emit('toggle', accordionOrder)" 
        class="horizontal-layout
        large-vertical-padding
        medium-vertical-gap
        non-text-clickable">
        <h2 class="fill-space
          key-text">
          Step {{ accordionOrder + 1 }}: {{ title }}
        </h2>
        <Icon 
            :iconChoice="ACCORDION_STATE_TO_ICON_CHOICE[state]"
            :iconSize=IconSize.LARGE>
        </Icon>
      </div>
      <div v-show="ACCORDION_STATE_TO_SHOW_CONTENT_BOOLEAN[state]">
        <slot></slot>
      </div>
      <div v-show="ACCORDION_STATE_TO_SHOW_CONTENT_BOOLEAN[state] && completeButtonText"
        class="horizontal-layout
        primary-right
        small-horizontal-gap
        small-top-padding">
        <Button v-if="showSkipButton"
          @buttonClicked="$emit('skip', accordionOrder)"
          :buttonStyle="ButtonStyle.SECONDARY"
          text="Skip"
          class="fill-space-small-only"></Button>
        <Button v-if="completeButtonText"
          @buttonClicked="$emit('complete', accordionOrder)"
          :buttonStyle="ButtonStyle.PRIMARY"
          :text="completeButtonText"
          class="fill-space-small-only"></Button>
      </div>
  </div>
</template>

<script lang="ts">
export enum AccordionState {
    OPEN,
    CLOSED
};

const ACCORDION_STATE_TO_ICON_CHOICE = {
  [`${AccordionState.CLOSED}`]: IconChoice.CHEVRON_DOWN,
  [`${AccordionState.OPEN}`]: IconChoice.CHEVRON_UP
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