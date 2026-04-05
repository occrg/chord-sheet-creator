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
                <div v-if="pages.length > 0" id="chord-section" ref="chordSectionFirstPage">
                    <ChordSheetPreviewChunk v-for="chunk in pages[0]" 
                        :chunk="chunk">
                    </ChordSheetPreviewChunk>
                </div>
            </div>
        </div>
        <div class="page" v-for="page in pages">
            <div class="page-content">
                <div ref="chordSectionPostFirstPage">
                <ChordSheetPreviewChunk v-for="chunk in page" 
                    :chunk="chunk">
                </ChordSheetPreviewChunk>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "chord-sheet-generator",
    data () {
    return {
        chunksSplitIntoPages: [] as ChordSheetSegmentChunk[][]
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
            this.pages = [this.chunks];
            const setIntervalId = setInterval(() => {
                const chordSectionElement = this.$refs.chordSectionFirstPage;
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

<style scoped>
@import "/chord_sheet.css";
@import "/chord_sheet_download.css";
</style>