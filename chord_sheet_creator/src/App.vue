<template>
    <div class="main">
        <h1>Chord Sheet Creator</h1>
        <form v-on:submit.prevent="createChordSheet">
            <label for="song-title-input">Title:</label>
            <input type="text" id="song-title-input" name="song-title-input" required v-model="title"><br>
            <label for="song-artist-input">Artist:</label>
            <input type="text" id="song-artist-input" name="song-artist-input" v-model="artist"><br>
            <label for="song-key-input">Key:</label>
            <input type="text" id="song-key-input" name="song-key-input" v-model="key"><br>
            <label for="song-bpm-input">Bpm:</label>
            <input type="text" id="song-bpm-input" name="song-bpm-input" v-model="bpm"><br>
            <label for="song-time-signature-input">Time signature:</label>
            <input type="text" id="song-time-signature-input" name="song-time-signature-input" v-model="time_signature"><br>
            <label for="song-lyrics-input">Lyrics:</label>
            <textarea id="song-lyrics-input" name="song-lyrics-input" rows="40" cols="60" required v-model="lyrics"></textarea><br>
            <button type="submit">Create</button>
        </form>
        <div id="input-section">

        </div>
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
  name: "app",
  data () {
    return {
      title: null as string | null,
      artist: null as string | null,
      key: null as string | null,
      bpm: null as string | null,
      time_signature: null as string | null,
      lyrics: null as string | null
    }
  },
  methods: {
    createChordSheet: function () {
      const parser = new DOMParser();
      let chordSheetHTML = parser.parseFromString(CHORD_SHEET_TEMPLATE_HTML, "text/html");
      chordSheetHTML = this.insertSongDetails(chordSheetHTML);
      chordSheetHTML = this.insertSongSegments(chordSheetHTML);
      console.log(chordSheetHTML)
    },
    insertSongDetails: function (chordSheetHTML: Document) {
      let songTitleHTML: Element | null = chordSheetHTML.querySelector("#song-title");
      if (songTitleHTML) songTitleHTML.innerHTML = `${this.$data.title}`;

      let songArtistHTML: Element | null = chordSheetHTML.querySelector("#song-artist");
      if (songArtistHTML) songArtistHTML.innerHTML = `${this.$data.artist}`;
      
      let songDetailsInnerHTML = "";
      if (this.$data.key) {
        songDetailsInnerHTML += `Key: ${this.$data.key}`;
      }
      if (this.$data.bpm) {
        if (songDetailsInnerHTML != "") songDetailsInnerHTML += "; ";
        songDetailsInnerHTML += `Tempo: ${this.$data.bpm}bpm`;
      }
      if (this.$data.time_signature) {
        if (songDetailsInnerHTML != "") songDetailsInnerHTML += "; ";
        songDetailsInnerHTML += `Time: ${this.$data.time_signature}`;
      }
      
      let songDetailsHTML: Element | null = chordSheetHTML.querySelector("#song-details");
      if (songDetailsHTML) {
        if (songDetailsInnerHTML == "") {
          songDetailsHTML.remove()
        } else {
          songDetailsHTML.innerHTML = songDetailsInnerHTML
        }
      }
      return chordSheetHTML;
    },
    insertSongSegments: function (chordSheetHTML: Document) {
        if (this.$data.lyrics) {
          let songSegments = this.$data.lyrics.split("\n\n");
    
          songSegments.forEach((songSegment, ind) => {
              let songSegmentHTML = this.getHTMLForSongSegment(songSegment, ind);
              let chordSectionHTML: Element | null = chordSheetHTML.querySelector("#chord-section");
              if (chordSectionHTML) chordSectionHTML.appendChild(songSegmentHTML);
          });
        } 
        return chordSheetHTML;
    },
    getHTMLForSongSegment: function (songSegment: string, ind: number) {
        let segmentDiv = document.createElement("div");
        segmentDiv.classList.add("segment");

        let segmentTitle = document.createElement("p");
        segmentTitle.classList.add("segment-title");
        segmentTitle.innerHTML = `Segment ${ind}`;

        let segmentContents = document.createElement("div");
        segmentContents.classList.add("segment-contents");

        let segmentLyricLines = songSegment.split("\n");

        segmentLyricLines.forEach(function (segmentLyricLine) {
            let segmentLyricLineHTML = document.createElement("p");
            segmentLyricLineHTML.classList.add("lyric-line");
            segmentLyricLineHTML.innerHTML = segmentLyricLine;
            segmentContents.appendChild(segmentLyricLineHTML);
        });

        segmentDiv.appendChild(segmentTitle);
        segmentDiv.appendChild(segmentContents);

        return segmentDiv;
    }
  }
};
</script>

<style>
body {
    margin: 0;
    padding: 3rem;
    background-color: #FAFAFA;
    font: 1rem "Arial";
}
</style>
