<script setup lang="ts">
import { mapState } from "pinia";
import { useDOMStore } from "@/stores/DOMStore";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

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
const CSS_CHORD_SHEET_FILEPATH = "/public/chord_sheet.css";
const CSS_CHORD_SHEET_DOWNLOAD_FILEPATH = "/public/chord_sheet_download.css";

const HTML_EXTENSION = ".html";

export default {
  name: "chord-sheet-controls",
  computed: {
    ...mapState(useDOMStore, ["chordSheetPreviewRef"]),
    ...mapState(useChordSheetStore, ["title", "artist"]),
    filename () {
      let cleanedTitle = this.title.replace(/[^0-9a-z ]/gi, '');
      let cleanedArtist = this.artist.replace(/[^0-9a-z ]/gi, '');
      let filename = "";
      if (cleanedTitle != "") {
        filename += cleanedTitle;
      }
      if (cleanedArtist != "") {
        if (filename && filename.length > 0) {
          filename += " - ";
        }
        filename += cleanedArtist;
      }
      if (filename && filename.length > 0) {
        filename += " - ";
      }
      filename += "Chord Sheet";
      return filename;
    }
  },
  methods: {
    downloadHTML: async function () {
      if (this.chordSheetPreviewRef == null)
        throw new Error("Chord sheet preview page element not found in storage");
      let chordSheetPreviewForExport: HTMLElement = this.prepareElementForHTMLDownload(this.chordSheetPreviewRef)
      let styledchordSheetPreviewForExport = await this.amendHTMLStyling(chordSheetPreviewForExport);
      this.downloadElementAsHTML(this.filename+HTML_EXTENSION, styledchordSheetPreviewForExport);
    },
    prepareElementForHTMLDownload: function (elementToDownload: HTMLElement): HTMLElement {
      let htmlElement = document.createElement("html");

      let headElement = document.createElement("head");
      let styleElement = document.createElement("style");
      headElement.appendChild(styleElement);
      
      let bodyElement = document.createElement("body");
      let elementToDownloadClone = elementToDownload.cloneNode(true) as HTMLElement;
      bodyElement.appendChild(elementToDownloadClone);

      htmlElement.appendChild(headElement);
      htmlElement.appendChild(bodyElement);

      return htmlElement;
    },
    amendHTMLStyling: async function (chordSheetPreviewForExport: HTMLElement): Promise<HTMLElement> {
      // Removes style of page-content div as this change the size of content based on screen size in web app but HTML
      // always shows as A4 size.
      chordSheetPreviewForExport = this.removeStyleAttributeFromPageContentDiv(chordSheetPreviewForExport);

      // Adds CSS styles directly to HTML so file can be downloaded as one simple HTML file.
      try {
        chordSheetPreviewForExport = 
          await this.addCSSFileAsStyle(CSS_CHORD_SHEET_FILEPATH, chordSheetPreviewForExport);
        chordSheetPreviewForExport = 
          await this.addCSSFileAsStyle(CSS_CHORD_SHEET_DOWNLOAD_FILEPATH, chordSheetPreviewForExport);
      } catch (error) {
        const errorMessage = (error as Error).message;
        throw new Error(errorMessage);
      }

      return chordSheetPreviewForExport;
    },
    removeStyleAttributeFromPageContentDiv: function (chordSheetPreviewForExport: HTMLElement): HTMLElement {
      const chordSheetPreviewPageContentElements = chordSheetPreviewForExport.getElementsByClassName("page-content");
      if (chordSheetPreviewPageContentElements.length != 1)
        throw new Error("Chord sheet preview page element not as expected");      
      const chordSheetPreviewPageContentElement = chordSheetPreviewPageContentElements[0] as HTMLElement;
      chordSheetPreviewPageContentElement.removeAttribute("style");
      return chordSheetPreviewForExport;
    },
    addCSSFileAsStyle: async function (filepath: string, elementToStyle: HTMLElement): Promise<HTMLElement> {
      const startOfCSSInCSSFile = `const __vite__css = "`;
      const endOfCSSInCSSFileIndicator = `}"`;
      const firstCharacterAfterEndOfCSSInCSSFile = `"`;
      
      const response = await fetch(filepath)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const cssFileText = await response.text();

      const afterStartOfCSSInCSSFileSplit: string[] = cssFileText.split(startOfCSSInCSSFile);
      if (afterStartOfCSSInCSSFileSplit.length != 2)
        throw new Error(`CSS file not in expected shape when splitting by 
        startOfCSSInCSSFile: ${startOfCSSInCSSFile}. cssFileText: ${cssFileText}`);
      const afterStartOfCSSInCSSFile: string = afterStartOfCSSInCSSFileSplit[1] as string;

      const beforeEndOfCSSInCSSFileSplit: string[] = afterStartOfCSSInCSSFile.split(endOfCSSInCSSFileIndicator);
      if (beforeEndOfCSSInCSSFileSplit.length != 2)
        throw new Error(`CSS file not in expected shape when splitting by 
        endOfCSSInCSSFileIndicator: ${endOfCSSInCSSFileIndicator}. 
        afterStartOfCSSInCSSFile: ${afterStartOfCSSInCSSFile}`);
      const beforeEndOfCSSInCSSFile: string = beforeEndOfCSSInCSSFileSplit[0] as string;
      
      // Adding back the part of the delimiter that is part of the CSS.
      const endOfCSSInCSSFileIndicatorSplit: string[] = 
      endOfCSSInCSSFileIndicator.split(firstCharacterAfterEndOfCSSInCSSFile);
      if (endOfCSSInCSSFileIndicatorSplit.length < 2)
        throw new Error(`Constants not as expected. 
        Splitting endOfCSSInCSSFileIndicator: ${endOfCSSInCSSFileIndicator} by 
        firstCharacterAfterEndOfCSSInCSSFile: ${firstCharacterAfterEndOfCSSInCSSFile}
        doesn't result in a 2 or more element array.`);
      const charactersToAddBackToCSSString: string = endOfCSSInCSSFileIndicatorSplit[0] as string;

      const cssContentUnformatted = beforeEndOfCSSInCSSFile + charactersToAddBackToCSSString;
            
      const styleElements = elementToStyle.getElementsByTagName("style");
      if (styleElements.length != 1)
        throw new Error("Constructed HTML element does not include exactly one style element");
      let styleElement = styleElements[0] as HTMLElement;
      const cssContent = cssContentUnformatted.replace(/\\n|\\/g, "");
      styleElement.innerHTML += cssContent;

      return elementToStyle;
    },
    downloadElementAsHTML: function (filename: string, elementToDownload: HTMLElement) {
      let downloadHelperElement = document.createElement("a");
      downloadHelperElement.setAttribute("href", 
        "data:application/html;charset=utf-8," + encodeURIComponent(elementToDownload.outerHTML));
      downloadHelperElement.setAttribute("download", filename);

      downloadHelperElement.style.display = "none";
      document.body.appendChild(downloadHelperElement);
      
      downloadHelperElement.click();
      document.body.removeChild(downloadHelperElement); 
    }
  }
};
</script>