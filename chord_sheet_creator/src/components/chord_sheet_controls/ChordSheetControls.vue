<script setup lang="ts">
import { mapState } from "pinia";
import { useDOMStore } from "@/stores/DOMStore";

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
  computed: {
    ...mapState(useDOMStore, ["chordSheetPreviewRef"])
  },
  methods: {
    downloadHTML: function () {
      if (this.chordSheetPreviewRef == null)
        throw new Error("Chord sheet preview page element not found in storage");
      let chordSheetPreviewForExport = this.chordSheetPreviewRef.cloneNode(true) as HTMLElement;

      let chordSheetPreviewPageContentElement = chordSheetPreviewForExport.children[0];
      if (chordSheetPreviewPageContentElement == null ||
        chordSheetPreviewPageContentElement.className !== "page-content")
      throw new Error("Chord sheet preview page element not as expected");
      
      chordSheetPreviewPageContentElement.removeAttribute("style");

      let filename = "chord_sheet.html";
      let element = document.createElement("a");
      element.setAttribute("href", "data:application/html;charset=utf-8," + encodeURIComponent(chordSheetPreviewForExport.outerHTML));
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);
      
      element.click();
      document.body.removeChild(element); 
      
      console.log(chordSheetPreviewForExport.outerHTML);
    }
  }
};
</script>