<script lang="ts" setup>
import type { PropType } from "vue";
</script>

<template>
  <div class="vertical-layout primary-middle"
    :class="{ 'rotate-180': direction == IconDirection.DEFAULT }">
      <svg :height="heightOfSVG()" :width="widthOfSVG()" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L14 14L26 2" stroke="#3F1E00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  </div>
</template>

<script lang="ts">
export enum IconDirection {
    DEFAULT,
    FLIPPED_VERTICALLY
}

export enum IconAxis {
    HEIGHT,
    WIDTH
}

export default {
  name: "icon",
  props: {
    direction: {
      type: Number as PropType<IconDirection>,
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