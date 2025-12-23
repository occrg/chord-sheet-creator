<script setup lang="ts">
import { ButtonStyle } from "../reusable/Button.vue";
import Button from "../reusable/Button.vue";
</script>

<template>
    <div id="chord-sheet-controls" 
      class="horizontal-layout
      medium-horizontal-gap
      primary-background-light
      large-vertical-padding
      large-horizontal-padding">
      <p class="key-text vertical-layout primary-middle">Download:</p>
      <div id="download-buttons">
        <Button
          @buttonClicked="downloadHTML"
          :buttonStyle="ButtonStyle.PRIMARY"
          text="HTML"></Button>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-controls",
  methods: {
    downloadHTML: function () {
      console.log("download HTML button clicked");
    }
  }
};
</script>