<script setup lang="ts">
import { mapWritableState } from "pinia";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";

const windowPropertiesStore = useWindowPropertiesStore();
</script>

<template>
  <div id="pixel-to-mm-generator" ref="pixelToMMGenerator" v-if="pixelToMMGeneratorExists"></div>
</template>

<script lang="ts">
export default {
  name: "window-properties-generator",
  data () {
    return {
        pixelToMMGeneratorExists: true as boolean
    }
  },
  computed: {
    ...mapWritableState(useWindowPropertiesStore, ["pixelsInAMilimetre"]),
  },
  mounted () {
    this.storePixelToMMConversion();
    this.pixelToMMGeneratorExists = false;
  },
  methods: {
    storePixelToMMConversion: function () {
        const pixelToMMGenerator: HTMLElement = this.$refs.pixelToMMGenerator as HTMLElement;
        if (pixelToMMGenerator) {
            this.pixelsInAMilimetre = pixelToMMGenerator.offsetHeight / 100;
        } else throw new Error("Pixel to mm generator element not found.");
    }
  }
}
</script>

<style>
#pixel-to-mm-generator {
    position: absolute;
    height: 100mm;
    width: 1mm;
    opacity: 0;
}
</style>