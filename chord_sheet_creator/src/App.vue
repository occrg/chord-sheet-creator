<script setup lang="ts">
import ChordSheetInput from "./components/ChordSheetInput.vue";
import ChordSheetPreviewContainer from "./components/ChordSheetPreviewContainer.vue";
import HeaderBar from "./components/header_bar/HeaderBar.vue";
</script>

<template>
  <HeaderBar></HeaderBar>
  <div id="content-container">
    <ChordSheetInput></ChordSheetInput>
    <ChordSheetPreviewContainer></ChordSheetPreviewContainer>
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
  background-color: #FAFAFA;
  font-family: var(--primary-font);
}

#content-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  padding: 1rem;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;
}
</style>
