<script setup lang="ts">
import ChordSheetInput from "./components/ChordSheetInput.vue";
import ChordSheetPreviewContainer from "./components/ChordSheetPreviewContainer.vue";
import HeaderBar from "./components/header_bar/HeaderBar.vue";
</script>

<template>
  <div id="app-container" class="vertical-layout">
    <HeaderBar></HeaderBar>
    <div id="content-container" 
      class="horizontal-layout
      fill-space
      vertical-scroll">
      <ChordSheetInput></ChordSheetInput>
      <ChordSheetPreviewContainer></ChordSheetPreviewContainer>
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
  background-color: #FAFAFA;
  font-family: var(--primary-font);
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
