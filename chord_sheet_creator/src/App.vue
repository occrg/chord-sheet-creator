<script setup lang="ts">
import ChordSheetInput from "./components/ChordSheetInput.vue";
import ChordSheetPreviewContainer from "./components/ChordSheetPreviewContainer.vue";
</script>

<template>
  <div id="app-content">
    <ChordSheetInput></ChordSheetInput>
    <ChordSheetPreviewContainer></ChordSheetPreviewContainer>
  </div>
</template>

<script lang="ts">
export default {
  name: "app",
}
</script>

<style>
body {
  margin: 0;
  padding: 1rem;
  background-color: #FAFAFA;
  font: 1rem "Arial";
}

#app-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;
}
</style>
