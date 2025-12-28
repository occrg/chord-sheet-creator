<script lang="ts" setup>
import { mapState, mapWritableState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";
import { useDOMStore } from "@/stores/DOMStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
  <div class="page close-to-back-shadow" ref="chordSheetPreviewPage">
    <!-- Do not add any style attribute to this div because it's removed upon download -->
    <div class="page-content">
      <h1 v-if="title" id="song-title">{{ chordSheetStore.title }}</h1>
      <h2 v-if="artist" id="song-artist">{{ chordSheetStore.artist }}</h2>
      <p v-if="songDetailsText" id="song-details">{{ songDetailsText }}</p>
      <div v-if="segments.length > 0" id="chord-section">
        <div class="segment" v-for="segment in segments">
          <p class="segment-title">{{ segment.segmentTitle }}</p>
          <div class="segment-contents">
            <div class="line" v-for="segmentLine in segment.segmentLines">
              <div class="chord-line">
                {{ segmentLine.chordLine.replace(/ /gi, "&nbsp;") }}
              </div>
              <div class="lyric-line">
                {{ segmentLine.lyricLine.replace(/ /gi, "&nbsp;") }}
              </div>
            </div>
          </div>
        </div>
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
    ...mapState(useChordSheetStore, ["title", "artist", "key", "bpm", "timeSignature", "segments"]),
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
  mounted () {
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
    }
  }
}
</script>

<style>
@import "/chord_sheet.css";
@import "/chord_sheet_preview.css";
</style>