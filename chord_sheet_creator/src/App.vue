<script setup lang="ts">
import ChordSheetInput from "./components/chord_sheet_input/ChordSheetInput.vue";
import ChordSheetPreviewContainer from "./components/chord_sheet_preview/ChordSheetPreviewContainer.vue";
import HeaderBar from "./components/header_bar/HeaderBar.vue";
import WindowPropertiesGenerator from "./components/utilities/WindowPropertiesGenerator.vue";
</script>

<template>
  <div id="app-container" 
    class="vertical-layout
    neutral-light-background">
    <HeaderBar></HeaderBar>
    <div id="content-container" 
      class="horizontal-layout
      fill-space
      vertical-scroll">
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
