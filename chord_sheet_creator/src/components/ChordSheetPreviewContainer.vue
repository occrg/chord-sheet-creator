<script setup lang="ts">
import ChordSheetPreview from "./ChordSheetPreview.vue";
</script>

<template>
  <div id="chord-sheet-preview-container">
    <ChordSheetPreview></ChordSheetPreview>
  </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-preview-container"
}
</script>

<style>
#chord-sheet-preview-container {
  border: 0.1rem solid;
}
</style>
