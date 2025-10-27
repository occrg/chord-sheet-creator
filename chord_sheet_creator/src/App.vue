<script setup lang="ts">
import ChordSheetInput from "./components/chord_sheet_input/ChordSheetInput.vue";
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
      wrap-around
      fill-space
      vertical-scroll
      no-scroll-for-non-large">
      <ChordSheetInput></ChordSheetInput>
      <ChordSheetPreviewContainer></ChordSheetPreviewContainer>
      <WindowPropertiesGenerator></WindowPropertiesGenerator>
    </div>
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
  font-family: var(--primary-font);
  display: flex;
  flex-direction: column;
}
</style>
