<script lang="ts" setup>
import ChordSheetPreviewChunk from "./ChordSheetPreviewChunk.vue";
import type { ChordSheetSegmentChunk } from "./ChordSheetPreviewChunk.vue";

import { mapState, mapWritableState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";
import { useDOMStore } from "@/stores/DOMStore";

import type { ChordSheetSegment } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
  <div class="page close-to-back-shadow" ref="chordSheetPreviewPage">
    <!-- Do not add any style attribute to this div because it's removed upon download -->
    <div class="page-content">
      <h1 v-if="title" id="song-title">{{ chordSheetStore.title }}</h1>
      <h2 v-if="artist" id="song-artist">{{ chordSheetStore.artist }}</h2>
      <p v-if="songDetailsText" id="song-details" 
        v-html="songDetailsText
        .replace(/(?<chord>[A-G]♭)/gi, `<span class='flat-chord'>$<chord></span>`)">
      </p>
      <div v-if="segments.length > 0" id="chord-section" ref="chordSection">
        <ChordSheetPreviewChunk v-for="chunk in chunksSplitIntoPages[0]" 
          :chunk="chunk">
        </ChordSheetPreviewChunk>
      </div>
    </div>
  </div>    
</template>

<script lang="ts">
const A4_HEIGHT_IN_MM = 297;

// The number of lines that a section should have for it to be worth splitting between two columns.
// The first column will have at least MIN_LINES_TO_SPLIT-MIN_LINES_IN_EACH_AFTER_SPLIT lines.
const MIN_LINES_TO_SPLIT = 5;
// The number of lines that the next column must at least have for it to be worth splitting.
const MIN_LINES_IN_CHUNK_AFTER_SPLIT = 2;

export default {
  name: "chord-sheet-preview",
  data () {
    return {
      resizeObserver: null as ResizeObserver | null,
      chunksSplitIntoPages: [] as ChordSheetSegmentChunk[][]
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
    },
    segmentsSplitIntoChunks: function (): ChordSheetSegmentChunk[] | [] {
      let chunks: ChordSheetSegmentChunk[] | [] = [];

      for (const segment of this.segments)
        chunks = [...chunks, ...this.splitSegmentIntoChunks(segment)];

      return chunks;
    }
  },
  watch: {
    segmentsSplitIntoChunks() {
      this.updatePageSplitOfChunksBasedOverflow();
    }
  },
  mounted () {
    this.setupResizeObserver();
    this.addChordSheetPreviewRefToStore();
    this.setupChunksSplitIntoPages();
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
    splitSegmentIntoChunks: function (segment: ChordSheetSegment): ChordSheetSegmentChunk[] {
      let segmentChunks: ChordSheetSegmentChunk[] = [];

      const linesInFirstChunk = this.linesInFirstChunk(segment);
      const totalNumberOfChunks = this.numberOfChunks(segment);

      let firstSegmentChunk: ChordSheetSegmentChunk = {
        segmentIndex: 0,
        chunksSegmentsTitle: segment.segmentTitle,
        numberOfChunksInSegmentsIndex: totalNumberOfChunks,
        segmentLines: []
      };
      
      for (let lineNumFirstChunk = 0; lineNumFirstChunk < linesInFirstChunk; lineNumFirstChunk++) {
        let segmentLineToPushInFirstChunk = segment.segmentLines[lineNumFirstChunk] 
        if (segmentLineToPushInFirstChunk == null) {
          throw new Error(`Segment line not found when splitting segment (${segment.segmentTitle})
            into first chunk (index: ${lineNumFirstChunk}, segment length: ${segment.segmentLines.length}).`);
        }
        firstSegmentChunk.segmentLines.push(segmentLineToPushInFirstChunk);
      }

       segmentChunks.push(firstSegmentChunk);

      for (let chunkNum = 1; chunkNum < totalNumberOfChunks; chunkNum++) {
          let currentSegmentChunk: ChordSheetSegmentChunk = {
            segmentIndex: chunkNum,
            chunksSegmentsTitle: segment.segmentTitle,
            numberOfChunksInSegmentsIndex: totalNumberOfChunks,
            segmentLines: []
          };

          let firstLineOfChunk = linesInFirstChunk + ((chunkNum-1) * MIN_LINES_IN_CHUNK_AFTER_SPLIT);
          for (let lineNumFurtherChunk = firstLineOfChunk; lineNumFurtherChunk < (firstLineOfChunk + MIN_LINES_IN_CHUNK_AFTER_SPLIT); 
          lineNumFurtherChunk++) {
            let segmentLineToPushInFurtherChunk = segment.segmentLines[lineNumFurtherChunk];
            if (segmentLineToPushInFurtherChunk == null) {
              throw new Error(`Segment line not found when splitting segment (${segment.segmentTitle})
                into furthers chunks (chunk num: ${chunkNum}, line index: ${lineNumFurtherChunk}, 
                segment length: ${segment.segmentLines.length}).`);
            }
            currentSegmentChunk.segmentLines.push(segmentLineToPushInFurtherChunk);
          }
            
          segmentChunks.push(currentSegmentChunk);
        }
              
      return segmentChunks;
    },
    linesInFirstChunk: function (segment: ChordSheetSegment) {
      return Math.min((MIN_LINES_TO_SPLIT-(1+(segment.segmentLines.length % MIN_LINES_IN_CHUNK_AFTER_SPLIT))), 
        segment.segmentLines.length);
    },
    numberOfChunks: function (segment: ChordSheetSegment) {
      return (1 + Math.floor((segment.segmentLines.length-this.linesInFirstChunk(segment))/MIN_LINES_IN_CHUNK_AFTER_SPLIT));
    },
    setupChunksSplitIntoPages: function () {
      this.chunksSplitIntoPages = [this.segmentsSplitIntoChunks];
    },
    updatePageSplitOfChunksBasedOverflow: function () {
      this.chunksSplitIntoPages = [this.segmentsSplitIntoChunks];
      const setIntervalId = setInterval(() => {
        const chordSectionElement = this.$refs.chordSection;
        if (chordSectionElement == null || !(chordSectionElement instanceof HTMLElement)) {
          throw new Error("Couldn't find chord section HTML element.");
        }
        console.log(chordSectionElement.scrollWidth, chordSectionElement.clientWidth)
        if (chordSectionElement.scrollWidth > chordSectionElement.clientWidth) {
          if (this.chunksSplitIntoPages[1] == null)
            this.chunksSplitIntoPages[1] = []
          
          if (this.chunksSplitIntoPages[0] == undefined || 
            this.chunksSplitIntoPages[0].length < 1) {
            throw new Error(`Scroll width (${chordSectionElement.scrollWidth}) larger than client width 
            (${chordSectionElement.clientWidth}) even though there's no chunks on page.`);
          }

          // Can cast to ChordSheetSegment here since this.chunksSplitIntoPages is a list of lists of 
          // ChordSheetSegmentChunks and this.chunksSplitIntoPages[0] has a length of 1 or more.
          const itemToMoveOntoNextPage = this.chunksSplitIntoPages[0].pop() as ChordSheetSegmentChunk;
          this.chunksSplitIntoPages[1].unshift(itemToMoveOntoNextPage);
        }
        if (chordSectionElement.scrollWidth == chordSectionElement.clientWidth) {
          clearInterval(setIntervalId);
        }
      }, 10);
    },
  }
}
</script>

<style>
@import "/chord_sheet.css";
@import "/chord_sheet_preview.css";
</style>