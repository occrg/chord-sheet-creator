<script lang="ts" setup>
import ChordSheetPreviewChunk from "./ChordSheetPreviewChunk.vue";

import { mapState, mapWritableState } from "pinia";
import { useChordSheetDetailsStore } from "@/stores/ChordSheetDetailsStore";
import { useChordSheetAcrossPagesStore } from "@/stores/ChordSheetAcrossPagesStore";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";
import { useChordSheetControlsStore } from "@/stores/ChordSheetControlsStore";

const chordSheetDetailsStore = useChordSheetDetailsStore();
</script>

<template>
  <div class="page close-to-back-shadow" ref="chordSheetPreviewPage">
    <div class="page-content">
      <template v-if="currentlySelectedPage == 0">
        <h1 v-if="title" id="song-title">{{ chordSheetDetailsStore.title }}</h1>
        <h2 v-if="artist" id="song-artist">{{ chordSheetDetailsStore.artist }}</h2>
        <p v-if="songDetailsText" id="song-details" 
          v-html="songDetailsText
          .replace(/(?<chord>[A-G]♭)/gi, `<span class='flat-chord'>$<chord></span>`)">
        </p>
      </template>
      <div v-if="chunks.length > 0 && pages.length > 0" class="chord-section" ref="chordSection">
        <ChordSheetPreviewChunk v-for="chunk in pages[currentlySelectedPage]" 
          :chunk="chunk">
        </ChordSheetPreviewChunk>
      </div>
    </div>
  </div> 
</template>

<script lang="ts">
const A4_HEIGHT_IN_MM = 297;

export default {
  name: "chord-sheet-preview",
  data () {
    return {
      resizeObserver: null as ResizeObserver | null
    }
  },
  computed: {
    ...mapState(useChordSheetDetailsStore, ["title", "artist", "key", "bpm", "timeSignature"]),
    ...mapState(useChordSheetAcrossPagesStore, ["chunks"]),
    ...mapWritableState(useChordSheetAcrossPagesStore, ["pages"]),
    ...mapState(useWindowPropertiesStore, ["pixelsInAMilimetre"]),
    ...mapState(useChordSheetControlsStore, ["currentlySelectedPage"]),
    songDetailsText() {
      let songDetailsText = "";
      if (this.key) {
        songDetailsText += `Key: ${this.key}`;
      }
      if (this.bpm) {
        if (songDetailsText != "") songDetailsText += "; ";
        songDetailsText += `Tempo: ${this.bpm}bpm`;
      }
      if (this.timeSignature) {
        if (songDetailsText != "") songDetailsText += "; ";
        songDetailsText += `Time: ${this.timeSignature}`;
      }

      return songDetailsText;
    }
  },
  mounted () {
    // This is so the ChordSheetAcrossPagesStore initialises and starts watching the 
    // ChordSheetStore before chords are entered.
    this.pages;

    this.setupResizeObserver();
  },
  methods: {
    setupResizeObserver: function () {
      this.resizeObserver = new ResizeObserver(this.onChordSheetPreviewResize);
      const chordSheetPreviewPageElement: HTMLElement = this.$refs.chordSheetPreviewPage as HTMLElement;
      if (chordSheetPreviewPageElement) {
        this.resizeObserver.observe(chordSheetPreviewPageElement);
      } else throw new Error("Chord sheet preview element not found.");
    },
    onChordSheetPreviewResize: function (resizeObserverEntries: ResizeObserverEntry[]) {
      if (resizeObserverEntries.length != 1 
        || !(resizeObserverEntries[0] instanceof ResizeObserverEntry)
        || resizeObserverEntries[0].target.children[0] == undefined) 
        throw new Error("Unexpected input from resize observer.");
      const resizeObserverEntry: ResizeObserverEntry = resizeObserverEntries[0];
      const pageContentElement: HTMLElement = resizeObserverEntry.target.children[0] as HTMLElement; 
      const chordSheetPreviewHeightMM = resizeObserverEntry.contentRect.height / this.pixelsInAMilimetre;
      const ratioOfChordSheetPreviewToA4 = chordSheetPreviewHeightMM / A4_HEIGHT_IN_MM;
      pageContentElement.style.zoom = `${ratioOfChordSheetPreviewToA4}`;
    }
  }
}
</script>

<style>
@import "/chord_sheet.css";
@import "/chord_sheet_preview.css";
</style>