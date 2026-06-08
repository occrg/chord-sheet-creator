<script setup lang="ts">
import { mapState } from "pinia";
import { useDOMStore } from "@/stores/DOMStore";
import { useChordSheetDetailsStore } from "@/stores/ChordSheetDetailsStore";
import { useChordSheetSegmentsStore } from "@/stores/ChordSheetSegmentsStore";
import type { ChordSheetSegment } from "@/stores/ChordSheetSegmentsStore";
import { useChordSheetAcrossPagesStore } from "@/stores/ChordSheetAcrossPagesStore";

import { ButtonStyle } from "../reusable/Button.vue";
import Button from "../reusable/Button.vue";
import { IconChoice } from "../reusable/Icon.vue";  
</script>

<template>
    <div id="download-buttons-area"
      class="horizontal-layout
      small-horizontal-gap
      fill-space">
        <div class="key-text vertical-layout primary-middle">Download:</div>
        <div id="download-buttons" 
            class="horizontal-layout
            small-horizontal-gap">
            <Button
                @buttonClicked="downloadHTML"
                :buttonStyle="ButtonStyle.PRIMARY"
                text="HTML">
            </Button>
            <Button
                @buttonClicked="downloadData"
                :buttonStyle="ButtonStyle.PRIMARY"
                text="Data">
            </Button>
        </div>
    </div>
</template>

<script lang="ts">
const CSS_CHORD_SHEET_FILEPATH = "/chord_sheet.css";
const CSS_CHORD_SHEET_DOWNLOAD_FILEPATH = "/chord_sheet_download.css";

const HTML_EXTENSION = ".html";
const JSON_EXTENSION = ".json";

interface ChordSheetJsonFormat {
    title: string,
    artist: string,
    key: string,
    bpm: string,
    timeSignature: string,
    segments: ChordSheetSegment[]
};

export default {
  name: "chord-sheet-controls-download-buttons",
  computed: {
    ...mapState(useDOMStore, ["chordSheetPageRefs"]),
    ...mapState(useChordSheetDetailsStore, ["title", "artist", "key", "bpm", "timeSignature"]),
    ...mapState(useChordSheetSegmentsStore, ["segments"]),
    ...mapState(useChordSheetAcrossPagesStore, ["pages"]),
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
      if (this.chordSheetPageRefs == null)
        throw new Error("Chord sheet preview page element not found in storage");
      let chordSheetPreviewForExport: HTMLElement = this.prepareElementForHTMLDownload(this.chordSheetPageRefs);
      let styledchordSheetPreviewForExport = await this.amendHTMLStyling(chordSheetPreviewForExport);
      this.downloadElementAsHTML(this.filename+HTML_EXTENSION, styledchordSheetPreviewForExport);
    },
    downloadData: function () {
      if (this.chordSheetPageRefs == null || this.chordSheetPageRefs.length == 0)
        throw new Error("Chord sheet preview page element not found in storage");
      const chordSheetData: ChordSheetJsonFormat = this.getChordSheetData();
      this.downloadJSON(this.filename+JSON_EXTENSION, chordSheetData);
    },
    prepareElementForHTMLDownload: function (elementsToDownload: HTMLElement[]): HTMLElement {
      let htmlElement = document.createElement("html");

      let headElement = document.createElement("head");
      let styleElement = document.createElement("style");
      headElement.appendChild(styleElement);
      
      let bodyElement = document.createElement("body");
      for (let elementToDownload of elementsToDownload) {
        let elementToDownloadClone = elementToDownload.cloneNode(true) as HTMLElement;
        bodyElement.appendChild(elementToDownloadClone);
      }

      htmlElement.appendChild(headElement);
      htmlElement.appendChild(bodyElement);

      return htmlElement;
    },
    amendHTMLStyling: async function (chordSheetPreviewForExport: HTMLElement): Promise<HTMLElement> {
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
    addCSSFileAsStyle: async function (filepath: string, elementToStyle: HTMLElement): Promise<HTMLElement> {      
      const response = await fetch(filepath)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const cssFileText = await response.text();

      const styleElements = elementToStyle.getElementsByTagName("style");
      if (styleElements.length != 1)
        throw new Error("Constructed HTML element does not include exactly one style element");
      let styleElement = styleElements[0] as HTMLElement;
      styleElement.innerHTML += cssFileText;

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
    },
    getChordSheetData: function (): ChordSheetJsonFormat {
      return {
        title: this.title,
        artist: this.artist,
        key: this.key,
        bpm: this.bpm,
        timeSignature: this.timeSignature,
        segments: this.segments
      }
    },
    downloadJSON: function (filename: string, json_data: object) {
      let downloadHelperElement = document.createElement("a");
      downloadHelperElement.setAttribute("href", 
        "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json_data)));
      downloadHelperElement.setAttribute("download", filename);

      downloadHelperElement.style.display = "none";
      document.body.appendChild(downloadHelperElement);
      
      downloadHelperElement.click();
      document.body.removeChild(downloadHelperElement); 
    }
  }
};
</script>