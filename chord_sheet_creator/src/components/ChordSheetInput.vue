<script setup lang="ts">
import InputField from "./InputField.vue";
import { InputFieldSize } from "./InputField.vue";

import { mapState, mapActions } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";
import type { ChordSheetSegment } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
    <div id="input-section" 
      class="fill-space
      vertical-scroll
      large-vertical-padding
      large-horizontal-padding">
        <form v-on:submit.prevent="createChordSheet">
            <InputField label="Title:" 
              id="song-title-input" 
              :modelValue="chordSheetStore.title"
              @update:modelValue="newValue => chordSheetStore.title = newValue"
              required>
            </InputField><br>
            <InputField label="Artist:" 
              id="song-artist-input" 
              :modelValue="chordSheetStore.artist"
              @update:modelValue="newValue => chordSheetStore.artist = newValue"
              required>
            </InputField><br>
            <InputField label="Key:" 
              id="song-key-input" 
              :modelValue="chordSheetStore.key"
              @update:modelValue="newValue => chordSheetStore.key = newValue"
              required
              :minSize="InputFieldSize.SMALL">
            </InputField><br>
            <InputField label="Bpm:" 
              id="song-bpm-input" 
              :modelValue="chordSheetStore.bpm"
              @update:modelValue="newValue => chordSheetStore.bpm = newValue"
              required
              :minSize="InputFieldSize.SMALL">
            </InputField><br>
            <InputField label="Time signature:" 
              id="song-time-signature-input" 
              :modelValue="chordSheetStore.timeSignature"
              @update:modelValue="newValue => chordSheetStore.timeSignature = newValue"
              required
              :minSize="InputFieldSize.SMALL">
            </InputField>
            <br><br><br>
            <label for="song-lyrics-input">Lyrics:</label>
            <textarea id="song-lyrics-input" name="song-lyrics-input" rows="40" cols="60" required v-model="lyrics"></textarea><br>
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<script lang="ts">
const CHORD_SHEET_TEMPLATE_HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <link rel="stylesheet" href="chord_sheet.css">
    </head>
    <body>
    <div class="page">
        <h1 id="song-title"></h1>
        <h2 id="song-artist"></h2>
        <p id="song-details"></p>
        <div id="chord-section"></div>
    </div>
    </body>
`

export default {
  name: "chord-sheet-input",
  data () {
    return {
      lyrics: "" as string
    }
  },
  computed: {
    ...mapState(useChordSheetStore, ["title", "artist", "key", "bpm", "timeSignature", "segments"])
  },
  methods: {
    ...mapActions(useChordSheetStore, ["storeChordSheetSegmentsFromLyrics"]),
    createChordSheet: function () {
      const parser = new DOMParser();
      try {
        let chordSheetHTML = parser.parseFromString(CHORD_SHEET_TEMPLATE_HTML, "text/html");
        this.storeChordSheetSegmentsFromLyrics(this.lyrics);

        chordSheetHTML = this.insertSongDetails(chordSheetHTML);
        chordSheetHTML = this.insertSongSegments(chordSheetHTML);
        console.log(chordSheetHTML)
      } catch (err) {
        console.error(err);
      }
    },
    insertSongDetails: function (chordSheetHTML: Document) {
      let songTitleHTML: Element | null = chordSheetHTML.querySelector("#song-title");
      if (songTitleHTML) songTitleHTML.innerHTML = `${this.title}`;
      else throw new Error("Song title element not found in chord sheet template HTML.");

      let songArtistHTML: Element | null = chordSheetHTML.querySelector("#song-artist");
      if (songArtistHTML) songArtistHTML.innerHTML = `${this.artist}`;
      else throw new Error("Song artist element not found in chord sheet template HTML.");
      
      let songDetailsInnerHTML = "";
      if (this.key) {
        songDetailsInnerHTML += `Key: ${this.key}`;
      }
      if (this.bpm) {
        if (songDetailsInnerHTML != "") songDetailsInnerHTML += "; ";
        songDetailsInnerHTML += `Tempo: ${this.bpm}bpm`;
      }
      if (this.timeSignature) {
        if (songDetailsInnerHTML != "") songDetailsInnerHTML += "; ";
        songDetailsInnerHTML += `Time: ${this.timeSignature}`;
      }
      
      let songDetailsHTML: Element | null = chordSheetHTML.querySelector("#song-details");
      if (songDetailsHTML) {
        if (songDetailsInnerHTML == "") {
          songDetailsHTML.remove()
        } else {
          songDetailsHTML.innerHTML = songDetailsInnerHTML
        }
      } else throw new Error("Song details element not found in chord sheet template HTML.");

      return chordSheetHTML;
    },
    insertSongSegments: function (chordSheetHTML: Document) {  
      let chordSectionHTML: Element | null = chordSheetHTML.querySelector("#chord-section");
      if (!chordSectionHTML) throw new Error("Song chord section element not found in chord sheet template HTML.");

      this.segments.forEach((segment) => {
          chordSectionHTML.appendChild(this.getHTMLForSongSegment(segment));
      });

      return chordSheetHTML;
    },
    getHTMLForSongSegment: function (segment: ChordSheetSegment) {
        let segmentDiv = document.createElement("div");
        segmentDiv.classList.add("segment");

        let segmentTitle = document.createElement("p");
        segmentTitle.classList.add("segment-title");
        segmentTitle.innerHTML = segment.segmentTitle;

        let segmentContents = document.createElement("div");
        segmentContents.classList.add("segment-contents");

        segment.segmentLines.forEach(function (segmentLine) {
            let segmentLyricLineHTML = document.createElement("p");
            segmentLyricLineHTML.classList.add("lyric-line");
            segmentLyricLineHTML.innerHTML = segmentLine.lyricLine;
            segmentContents.appendChild(segmentLyricLineHTML);
        });

        segmentDiv.appendChild(segmentTitle);
        segmentDiv.appendChild(segmentContents);

        return segmentDiv;
    }
  }
};
</script>