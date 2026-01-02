<script lang="ts" setup>
import type { PropType } from "vue";
</script>

<template>
  <div class="vertical-layout primary-middle"
    :class="{ 'rotate-180': ICON_CHOICE_ATTRIBUTES[iconChoice].flippedVertically }">
      <svg v-if="(iconChoice == IconChoice.CHEVRON_UP) || (iconChoice == IconChoice.CHEVRON_DOWN)" :height="heightOfSVG()" :width="widthOfSVG()" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L14 14L26 2" stroke="#3F1E00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  </div>
</template>

<script lang="ts">
export enum IconAxis {
    HEIGHT,
    WIDTH
}

export enum IconChoice {
  CHEVRON_UP,
  CHEVRON_DOWN
}

const ICON_CHOICE_ATTRIBUTES = {
  [IconChoice.CHEVRON_UP]: {
    flippedVertically: true
  },
  [IconChoice.CHEVRON_DOWN]: {
    flippedVertically: false
  },
}

export default {
  name: "icon",
  props: {
    iconChoice: {
      type: Number as PropType<IconChoice>,
      required: true
    },
    scalesWithAxis: {
      type: Number as PropType<IconAxis>,
      required: true
    },
    proportionOfAxis: {
      type: Number,
      required: true
    }
  },
  methods: {
    heightOfSVG: function () {
      return (this.scalesWithAxis == IconAxis.HEIGHT) ? `${this.proportionOfAxis}%` : undefined;
    },
    widthOfSVG: function () {
      return (this.scalesWithAxis == IconAxis.WIDTH) ? `${this.proportionOfAxis}%` : undefined;
    },
  }
};
</script>