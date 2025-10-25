<script setup lang="ts">
import { InputType } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import { AccordionState } from "../reusable/Accordion.vue";
import Accordion from "../reusable/Accordion.vue";

import { mapState, mapActions } from "pinia";
import type { ChordSheetSegment } from "@/stores/ChordSheetStore";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
    <Accordion :stepNumber=2 
        title="Prefill chord sheet"
        :defaultState=AccordionState.OPEN>
        <div id="step-2-section-content" 
            class="">
            <InputField label="Chord Sheet Content"
                id="chord-sheet-content-input" 
                :modelValue="lyrics"
                @update:modelValue="newValue => lyrics = newValue"
                required
                :inputType="InputType.MULTILINE"></InputField>
            <button type="submit" @click="createChordSheet">Create</button>
        </div>
    </Accordion>
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
    name: "chord-sheet-input-step2",
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