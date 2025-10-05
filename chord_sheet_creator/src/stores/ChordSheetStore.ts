import { defineStore } from "pinia"

export interface ChordSheetLine {
    chordLine: string,
    lyricLine: string
}

export interface ChordSheetSegment {
    segmentTitle: string,
    segmentLines: ChordSheetLine[]
}

export const useChordSheetStore = defineStore("chord-sheet", {
    state: () => {
        return {
            title: "" as string,
            artist: "" as string,
            key: "" as string,
            bpm: "" as string,
            timeSignature: "" as string,
            segments: [] as ChordSheetSegment[]
        }
    },
    actions: {
        storeChordSheetSegmentsFromLyrics: function (lyrics: string) {
            let chordSheetSegmentsFromLyrics = lyrics.split("\n\n");
            chordSheetSegmentsFromLyrics.forEach((chordSheetSegmentFromLyrics, ind) => {
                let chordSheetSegment: ChordSheetSegment = {
                    segmentTitle: `Segment ${ind}`,
                    segmentLines: []
                }
                
                let chordSheetLinesFromLyrics = chordSheetSegmentFromLyrics.split("\n");
                chordSheetLinesFromLyrics.forEach((chordSheetLineFromLyrics) => {
                    chordSheetSegment.segmentLines.push({
                        chordLine: "",
                        lyricLine: chordSheetLineFromLyrics
                    });
                });
                
                this.segments.push(chordSheetSegment);
            });
          },
    }
  })