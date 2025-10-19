<script lang="ts" setup>
import { mapState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";

const chordSheetStore = useChordSheetStore();
const windowPropertiesStore = useWindowPropertiesStore();
</script>

<template>
  <div class="page" ref="chordSheetPreviewPage">
    <div class="page-content">
      <h1 id="song-title">{{ chordSheetStore.title }}</h1>
      <h2 id="song-artist">{{ chordSheetStore.artist }}</h2>
      <p id="song-details">{{ songDetailsText }}</p>
      <div id="chord-section">
        <div class="segment" v-for="segment in segments">
          <p class="segment-title">{{ segment.segmentTitle }}</p>
          <div class="segment-contents">
            <div class="lyric-line" v-for="segmentLine in segment.segmentLines">
              {{ segmentLine.lyricLine }}
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
.page {
    margin: 0;
    padding: 0;
    font: 0.9rem "Tahoma";
    display: flex;
    flex-direction: column;
    aspect-ratio: 0.7071;
    background: white;
}

.page-content {
    height: 100%;
    margin: 1cm;
    display: flex;
    flex-direction: column;
}

h1 {
    text-align: center;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
}

h2 {
    text-align: center;
    font-weight: normal;
    font-size: 1.2rem;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
}

#song-details {
    text-align: center;
    margin-top: 0rem;
    margin-bottom: 1rem;
}

#chord-section {
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: start;
    align-content: space-between;
}

.segment {
    width: 49%;
    margin-bottom: 1.5rem;
}

.segment-title {
    margin-top: 0;
    margin-bottom: 0.2rem;
    font-weight: bold;
    font-size: 1.1rem;
}

.segment-contents {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}

.chord-line {
    margin-top: 0;
    margin-bottom: 0.1rem;
    font-weight: bold;
}

.chord {
    margin-right: 1rem;
}

.lyric-line {
    margin-top: 0;
    margin-bottom: 0.4rem;
}

.flat-chord {
    letter-spacing: -0.2rem;
    margin-right: 0.1rem;
}
</style>