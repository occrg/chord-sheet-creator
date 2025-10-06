<script setup lang="ts">
import ChordSheetInput from "./components/ChordSheetInput.vue";
</script>

<template>
    <div class="main">
      <h1>Chord Sheet Creator</h1>
      <ChordSheetInput></ChordSheetInput>
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
    padding: 3rem;
    background-color: #FAFAFA;
    font: 1rem "Arial";
}
</style>
