<script setup lang="ts">
import type { PropType } from "vue";

import Icon from "./Icon.vue";
import { IconChoice, IconAxis } from "./Icon.vue";
</script>

<template>
    <button @click="$emit('buttonClicked')" 
        class="horizontal-layout
        secondary-middle
        extra-small-horizontal-gap
        medium-horizontal-padding
        medium-vertical-padding
        change-on-hover
        medium-border-radius
        medium-shadow
        non-text-clickable"
        :class="{
          'primary-background': buttonStyle == ButtonStyle.PRIMARY,
          'full-primary-border': buttonStyle == ButtonStyle.PRIMARY,
          'primary-background-light': buttonStyle == ButtonStyle.SECONDARY,
          'full-secondary-light-border': buttonStyle == ButtonStyle.SECONDARY,
          'extra-small-min-width': buttonHasText,
          'extra-extra-small-min-width': !buttonHasText, 
          'touchable-area-height': !buttonHasText
        }">
        <div v-if="iconChoice != undefined"
          class="fill-space">
          <Icon :iconChoice="iconChoice"
            :proportionOfAxis=60
            :scalesWithAxis=IconAxis.HEIGHT>
          </Icon>
        </div>
        <div v-if="(text && text.length > 0)"
          class="key-text
          fill-space">
          {{ text }}
        </div>
    </button>
</template>

<script lang="ts">
export enum ButtonStyle {
    PRIMARY,
    SECONDARY
};

export default {
  name: "custom-button",
  data () {
    return {
      buttonHasText: true as boolean
    }
  },
  props: {
    buttonStyle: {
      type: Number as PropType<ButtonStyle>,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    iconChoice: {
      type: Number as PropType<IconChoice>,
      required: false
    }
  },
  created () {
    this.setInitialData();
  },
  methods: {
    setInitialData: function() {
      this.buttonHasText = (this.text && this.text.length > 0) ? true : false;
    }
  },
  emits: ["buttonClicked"]
};
</script>