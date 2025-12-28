<script setup lang="ts">
import type { PropType } from "vue";
</script>

<template>
    <button @click="$emit('buttonClicked')" 
        class="key-text
        medium-horizontal-padding
        medium-vertical-padding
        change-on-hover
        medium-border-radius
        medium-shadow
        non-text-clickable"
        :class="BUTTON_STYLE_TO_COLOUR_CLASS[buttonStyle]">
        {{ text }}
    </button>
</template>

<script lang="ts">
export enum ButtonStyle {
    PRIMARY,
    SECONDARY
};

const BUTTON_STYLE_TO_COLOUR_CLASS = {
  [`${ButtonStyle.PRIMARY}`]: ["primary-background", "full-primary-border"],
  [`${ButtonStyle.SECONDARY}`]: ["primary-background-light", "full-secondary-light-border"]
};

export default {
  name: "custom-button",
  props: {
    buttonStyle: {
      type: Number as PropType<ButtonStyle>,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  emits: ["buttonClicked"]
};
</script>