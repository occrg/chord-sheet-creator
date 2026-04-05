import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import type { ChordSheetLine } from "./ChordSheetSegmentsStore";
import { useChordSheetSegmentsStore } from "./ChordSheetSegmentsStore";

import type { Ref, ComputedRef } from "vue";

import type { ChordSheetSegment } from "./ChordSheetSegmentsStore";


export interface ChordSheetSegmentChunk {
    segmentIndex: number,
    chunksSegmentsTitle: string,
    numberOfChunksInSegmentsIndex: number,
    segmentLines: ChordSheetLine[]
}

export const useChordSheetAcrossPagesStore = defineStore("chord-sheet-across-pages", () => {
    const chordSheetSegmentsStore = useChordSheetSegmentsStore();

    // The number of lines that a section should have for it to be worth splitting between two columns.
    // The first column will have at least MIN_LINES_TO_SPLIT-MIN_LINES_IN_EACH_AFTER_SPLIT lines.
    const MIN_LINES_TO_SPLIT = 5;
    // The number of lines that the next column must at least have for it to be worth splitting.
    const MIN_LINES_IN_CHUNK_AFTER_SPLIT = 2;
    
    let chunks: ComputedRef<ChordSheetSegmentChunk[]> = 
        reactive(computed(() => segmentsSplitIntoChunks(chordSheetSegmentsStore.segments)));
    let pages: Ref<ChordSheetSegmentChunk[][]> = ref([]);

    function segmentsSplitIntoChunks (segments: ChordSheetSegment[]) {
        let chunks: ChordSheetSegmentChunk[] | [] = [];

        for (const segment of segments)
            chunks = [...chunks, ...splitSegmentIntoChunks(segment)];

        return chunks;
    }

    function splitSegmentIntoChunks (segment: ChordSheetSegment): ChordSheetSegmentChunk[] {
        let segmentChunks: ChordSheetSegmentChunk[] = [];
    
        const linesInFirstChunkNum = linesInFirstChunk(segment);
        const totalNumberOfChunks = numberOfChunks(segment);
    
        let firstSegmentChunk: ChordSheetSegmentChunk = {
            segmentIndex: 0,
            chunksSegmentsTitle: segment.segmentTitle,
            numberOfChunksInSegmentsIndex: totalNumberOfChunks,
            segmentLines: []
        };
        
        for (let lineNumFirstChunk = 0; lineNumFirstChunk < linesInFirstChunkNum; lineNumFirstChunk++) {
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
    
            let firstLineOfChunk = linesInFirstChunkNum + ((chunkNum-1) * MIN_LINES_IN_CHUNK_AFTER_SPLIT);
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
    }

    function linesInFirstChunk (segment: ChordSheetSegment) {
        return Math.min((MIN_LINES_TO_SPLIT-(1+(segment.segmentLines.length % MIN_LINES_IN_CHUNK_AFTER_SPLIT))), 
          segment.segmentLines.length);
    }

    function numberOfChunks (segment: ChordSheetSegment) {
        return (1 + Math.floor((segment.segmentLines.length-linesInFirstChunk(segment))/MIN_LINES_IN_CHUNK_AFTER_SPLIT));
    }

    return { chunks, pages };
  })