<script lang="ts" setup>
import { mapState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
  <div class="page">
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
export default {
  name: "chord-sheet-preview",
  computed: {
    ...mapState(useChordSheetStore, ["title", "artist", "key", "bpm", "timeSignature", "segments"]),
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
    padding: 1cm;
    background: white;
}

.page-content {
    height: 100%;
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