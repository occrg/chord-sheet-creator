<script setup lang="ts">
import ChordSheetPreview from "./ChordSheetPreview.vue";
</script>

<template>
  <div id="chord-sheet-preview-container"
    class="horizontal-layout
    large-horizontal-padding
    large-vertical-padding
    no-top-padding-for-non-large
    primary-background-light
    far-from-back-shadow">
    <ChordSheetPreview></ChordSheetPreview>
  </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-preview-container"
}
</script>
