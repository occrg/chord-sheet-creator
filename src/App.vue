<script setup lang="ts">
import ChordSheetInput from "./components/chord_sheet_input/ChordSheetInput.vue";
import ChordSheetControls from "./components/chord_sheet_controls/ChordSheetControls.vue";
import ChordSheetPreviewContainer from "./components/chord_sheet_preview/ChordSheetPreviewContainer.vue";
import HeaderBar from "./components/header_bar/HeaderBar.vue";
import WindowPropertiesGenerator from "./components/utilities/WindowPropertiesGenerator.vue";
</script>

<template>
  <div id="app-container" 
    class="vertical-layout
    fix-to-screen-height
    auto-screen-height-for-non-large
    neutral-light-background">
    <HeaderBar></HeaderBar>
    <div id="content-container" 
      class="horizontal-layout
      split-between-two
      fill-space
      vertical-scroll
      no-scroll-for-non-large">
      <div id="chord-sheet-interactions" 
        class="vertical-layout
          fill-space">
        <ChordSheetInput></ChordSheetInput>
        <ChordSheetControls></ChordSheetControls>
      </div>
      <ChordSheetPreviewContainer></ChordSheetPreviewContainer>
    </div>
    <WindowPropertiesGenerator></WindowPropertiesGenerator>
  </div>
</template>

<script lang="ts">
export default {
  name: "app"
}
</script>

<style>
@import "/main.css";

body {
  margin: 0;
}

#app-container {
  display: flex;
  flex-direction: column;
  position:relative;
  height: 100vh;
  width: 100vw;
  overflow: clip;
  font-family: var(--primary-font);
}
</style>
