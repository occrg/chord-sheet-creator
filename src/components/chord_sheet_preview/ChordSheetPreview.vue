<script lang="ts" setup>
import ChordSheetPreviewChunk from "./ChordSheetPreviewChunk.vue";
import type { ChordSheetSegmentChunk } from "./ChordSheetPreviewChunk.vue";

import { mapState, mapWritableState } from "pinia";
import { useChordSheetDetailsStore } from "@/stores/ChordSheetDetailsStore";
import { useChordSheetSegmentsStore } from "@/stores/ChordSheetSegmentsStore";
import { useChordSheetAcrossPagesStore } from "@/stores/ChordSheetAcrossPagesStore";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";
import { useDOMStore } from "@/stores/DOMStore";

import type { ChordSheetSegment } from "@/stores/ChordSheetSegmentsStore";

const chordSheetDetailsStore = useChordSheetDetailsStore();
</script>

<template>
  <div class="page close-to-back-shadow" ref="chordSheetPreviewPage">
    <!-- Do not add any style attribute to this div because it's removed upon download -->
    <div class="page-content">
      <h1 v-if="title" id="song-title">{{ chordSheetDetailsStore.title }}</h1>
      <h2 v-if="artist" id="song-artist">{{ chordSheetDetailsStore.artist }}</h2>
      <p v-if="songDetailsText" id="song-details" 
        v-html="songDetailsText
        .replace(/(?<chord>[A-G]♭)/gi, `<span class='flat-chord'>$<chord></span>`)">
      </p>
      <div v-if="segments.length > 0 && pages.length > 0" id="chord-section" ref="chordSection">
        <ChordSheetPreviewChunk v-for="chunk in pages[0]" 
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
      resizeObserver: null as ResizeObserver | null,
      chunksSplitIntoPages: [] as ChordSheetSegmentChunk[][]
    }
  },
  computed: {
    ...mapState(useChordSheetDetailsStore, ["title", "artist", "key", "bpm", "timeSignature"]),
    ...mapState(useChordSheetSegmentsStore, ["segments"]),
    ...mapState(useChordSheetAcrossPagesStore, ["chunks"]),
    ...mapWritableState(useChordSheetAcrossPagesStore, ["pages"]),
    ...mapState(useWindowPropertiesStore, ["pixelsInAMilimetre"]),
    ...mapWritableState(useDOMStore, ["chordSheetPreviewRef"]),
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
  watch: {
    chunks() {
      this.updatePageSplitOfChunksBasedOverflow();
    }
  },
  mounted () {
    // This is so the ChordSheetAcrossPagesStore initialises and starts watching the 
    // ChordSheetStore before chords are entered.
    this.pages;

    this.setupResizeObserver();
    this.addChordSheetPreviewRefToStore();
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
    },
    addChordSheetPreviewRefToStore: function () {
      if (this.$refs.chordSheetPreviewPage == null)
        throw new Error("Chord sheet preview page element not found for storage");
      this.chordSheetPreviewRef = this.$refs.chordSheetPreviewPage as HTMLElement;
    },
    updatePageSplitOfChunksBasedOverflow: function () {
      this.pages = [this.chunks];
      console.log(this.pages)
      const setIntervalId = setInterval(() => {
        const chordSectionElement = this.$refs.chordSection;
        if (chordSectionElement == null || !(chordSectionElement instanceof HTMLElement)) {
          throw new Error("Couldn't find chord section HTML element.");
        }

        if (chordSectionElement.scrollWidth > chordSectionElement.clientWidth) {
          if (this.pages[1] == null)
            this.pages[1] = []
          
          if (this.pages[0] == undefined || 
            this.pages[0].length < 1) {
            throw new Error(`Scroll width (${chordSectionElement.scrollWidth}) larger than client width 
            (${chordSectionElement.clientWidth}) even though there's no chunks on page.`);
          }

          // Can cast to ChordSheetSegment here since this.chunksSplitIntoPages is a list of lists of 
          // ChordSheetSegmentChunks and this.chunksSplitIntoPages[0] has a length of 1 or more.
          const itemToMoveOntoNextPage = this.pages[0].pop() as ChordSheetSegmentChunk;
          this.pages[1].unshift(itemToMoveOntoNextPage);
        }
        if (chordSectionElement.scrollWidth == chordSectionElement.clientWidth) {
          clearInterval(setIntervalId);
        }
      }, 10);
    }
  }
}
</script>

<style>
@import "/chord_sheet.css";
@import "/chord_sheet_preview.css";
</style>