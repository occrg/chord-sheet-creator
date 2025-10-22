<script setup lang="ts">
import ChordSheetPreview from "./ChordSheetPreview.vue";
</script>

<template>
  <div id="chord-sheet-preview-container"
    class="horizontal-layout
    large-horizontal-padding
    large-vertical-padding
    primary-background-light">
    <ChordSheetPreview></ChordSheetPreview>
  </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-preview-container"
}
</script>
