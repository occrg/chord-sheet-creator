<script setup lang="ts">
import ChordSheetControlsDownloadButtons from "./ChordSheetControlsDownloadButtons.vue";
import ChordSheetControlsPageSwitcher from "./ChordSheetControlsPageSwitcher.vue";
</script>

<template>
    <div id="chord-sheet-controls" 
      class="horizontal-layout
      wrap-around
      primary-right
      medium-vertical-gap
      medium-horizontal-gap
      primary-background-light
      large-vertical-padding
      large-horizontal-padding">
      <ChordSheetControlsDownloadButtons></ChordSheetControlsDownloadButtons>
      <ChordSheetControlsPageSwitcher></ChordSheetControlsPageSwitcher>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-controls"
};
</script>