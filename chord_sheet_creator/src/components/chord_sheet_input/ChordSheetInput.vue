<script setup lang="ts">
import { useChordSheetStore } from "@/stores/ChordSheetStore";
import ChordSheetInputStep1 from "./ChordSheetInputStep1.vue";
import ChordSheetInputStep2 from "./ChordSheetInputStep2.vue";

const chordSheetStore = useChordSheetStore();
</script>

<template>
    <div id="input-section" 
      class="vertical-layout
      medium-gap
      fill-space
      vertical-scroll
      large-vertical-padding
      large-horizontal-padding">
      <ChordSheetInputStep1></ChordSheetInputStep1>
      <ChordSheetInputStep2></ChordSheetInputStep2>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-input",
};
</script>