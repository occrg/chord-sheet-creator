<script lang="ts" setup>
import ChordSheetPreviewChunk from "../chord_sheet_preview/ChordSheetPreviewChunk.vue";
import type { ChordSheetSegmentChunk } from "../chord_sheet_preview/ChordSheetPreviewChunk.vue";

import { mapState, mapWritableState } from "pinia";
import { useChordSheetDetailsStore } from "@/stores/ChordSheetDetailsStore";
import { useChordSheetAcrossPagesStore } from "@/stores/ChordSheetAcrossPagesStore";
import { useWindowPropertiesStore } from "@/stores/WindowPropertiesStore";    

const chordSheetDetailsStore = useChordSheetDetailsStore();
</script>
    
<template>
    <div style="position:absolute; top:100vh">
        <div class="page">
            <div class="page-content">
                <h1 v-if="title" id="song-title">{{ chordSheetDetailsStore.title }}</h1>
                <h2 v-if="artist" id="song-artist">{{ chordSheetDetailsStore.artist }}</h2>
                <p v-if="songDetailsText" id="song-details" 
                    v-html="songDetailsText
                    .replace(/(?<chord>[A-G]♭)/gi, `<span class='flat-chord'>$<chord></span>`)">
                </p>
                <div v-if="chordSheetGeneratorChunksInPages.length > 0" class="chord-section" ref="chordSectionFirstPage">
                    <ChordSheetPreviewChunk v-for="chunk in chordSheetGeneratorChunksInPages[0]" 
                        :chunk="chunk">
                    </ChordSheetPreviewChunk>
                </div>
            </div>
        </div>
        <template v-if="chordSheetGeneratorChunksInPages.length > 1">
            <div class="page" v-for="pageNum in chordSheetGeneratorChunksInPages.length-1">
                <div class="page-content">
                    <div class="chord-section" ref="chordSectionPostFirstPage">
                    <ChordSheetPreviewChunk v-for="chunk in chordSheetGeneratorChunksInPages[pageNum]" 
                        :chunk="chunk">
                    </ChordSheetPreviewChunk>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
export default {
    name: "chord-sheet-generator",
    data () {
    return {
        chordSheetGeneratorChunksInPages: [[]] as ChordSheetSegmentChunk[][],
        chordSectionElements: [] as HTMLElement[]
    }
    },
    computed: {
        ...mapState(useChordSheetDetailsStore, ["title", "artist", "key", "bpm", "timeSignature"]),
        ...mapState(useChordSheetAcrossPagesStore, ["chunks"]),
        ...mapWritableState(useChordSheetAcrossPagesStore, ["pages"]),
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
    watch: {
        chunks() {
            this.updatePageSplitOfChunksBasedOverflow();
        }
    },
    methods: {
        updatePageSplitOfChunksBasedOverflow: function () {
            this.chordSheetGeneratorChunksInPages = [this.chunks];
            this.generateChordSectionElements();
            const setIntervalId = setInterval(() => { this.updatePageSplitOfChunksForPage(0, setIntervalId) }, 5);
        },
        updatePageSplitOfChunksForPage: function (pageNum: number, setIntervalId: number) {
            const chordSectionElement = this.chordSectionElements[pageNum];          
            if (chordSectionElement == null || !(chordSectionElement instanceof HTMLElement)) {
                throw new Error("Couldn't find chord section HTML element.");
            }
            
            if (chordSectionElement.scrollWidth > chordSectionElement.clientWidth) {
                if (this.chordSheetGeneratorChunksInPages[pageNum+1] == null) {
                    this.addNewPage();
                } else {
                    if (this.chordSheetGeneratorChunksInPages[pageNum] == undefined || 
                        this.chordSheetGeneratorChunksInPages[pageNum].length < 1) {
                        throw new Error(`For page ${pageNum}, scroll width (${chordSectionElement.scrollWidth}) ` + 
                            `larger than client width (${chordSectionElement.clientWidth}) even though there's ` + 
                            `no chunks on page.`);
                    }

                    if (this.chordSheetGeneratorChunksInPages[pageNum+1] == undefined)
                        throw new Error(`Page ${pageNum+1}, doesn't exist despite needing to add a chunk to it. `);
                    
                    // Can cast to ChordSheetSegment here since this.chunksSplitIntoPages is a list of lists of 
                    // ChordSheetSegmentChunks and this.chunksSplitIntoPages[0] has a length of 1 or more.
                    const itemToMoveOntoNextPage = this.chordSheetGeneratorChunksInPages[pageNum].pop() as ChordSheetSegmentChunk;
                    // Can assert that this object isn't undefined becayse error is thrown above if it is.
                    this.chordSheetGeneratorChunksInPages[pageNum+1]!.unshift(itemToMoveOntoNextPage);
                }
                
            }
            if (chordSectionElement.scrollWidth == chordSectionElement.clientWidth) {
                if (pageNum+1 < this.chordSectionElements.length) {
                    // Now this page is finished, move onto the next one.
                    const setNextIntervalId = setInterval(() => { this.updatePageSplitOfChunksForPage(pageNum+1, setNextIntervalId) }, 5);
                } else {
                    // If there are no pages left after this one, make changes on the preview.
                    this.pages = this.chordSheetGeneratorChunksInPages;
                }
                clearInterval(setIntervalId);
                
            }
        },
        addNewPage: function () {
            this.chordSheetGeneratorChunksInPages.push([]);
            setTimeout(this.generateChordSectionElements, 5);
        },
        generateChordSectionElements: function () {
            if (this.$refs.chordSectionFirstPage == undefined 
                || !(this.$refs.chordSectionFirstPage instanceof HTMLElement))
                throw new Error("chordSectionFirstPage not of type HTMLElement.");

            let chordSectionElements: HTMLElement[] = [this.$refs.chordSectionFirstPage];

            if (this.$refs.chordSectionPostFirstPage) {
                if (!(Symbol.iterator in (this.$refs.chordSectionPostFirstPage as Iterable<HTMLElement>)))
                    throw new Error("chordSectionPostFirstPage references not returning as an iterable array.");
                // Can assert that this object is a list of HTMLElements as checked above.
                chordSectionElements.push(...this.$refs.chordSectionPostFirstPage as Iterable<HTMLElement>);
            }
            
            this.chordSectionElements = chordSectionElements;
        }
    }
}
</script>

<style scoped>
@import "/chord_sheet.css";
@import "/chord_sheet_download.css";
</style>