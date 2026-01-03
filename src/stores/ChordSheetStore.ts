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
        moveLineUp: function (segmentInd: number, lineInd: number) {
            if (lineInd == 0)
                throw new Error(`Line (segment index: ${segmentInd}; line index: ${lineInd}) requested 
                in moveLineUp function cannot be moved up as it's already the first line of its segment.`);

            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (${segmentInd}) requested in moveLineUp 
                function doesn't exist. Array length: ${this.segments.length}.`);
            const segment = this.segments[segmentInd];
            const segmentLines = segment.segmentLines;

            if (segmentLines[lineInd] == null)
                throw new Error(`Line index (${lineInd}) requested in moveLineUp function 
                doesn't exist. Array length: ${segmentLines.length}.`);
            const lineToMoveUp = segmentLines[lineInd];

            segmentLines.splice(lineInd, 1);
            segmentLines.splice(lineInd-1, 0, lineToMoveUp);
        },
        moveLineDown: function (segmentInd: number, lineInd: number) {
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (segment index: ${segmentInd}) requested 
                in moveLineDown function doesn't exist. Array length: ${this.segments.length}.`);
            const segment = this.segments[segmentInd];
            const segmentLines = segment.segmentLines;

            if (segmentLines[lineInd] == null)
                throw new Error(`Line (segment index: ${segmentInd}; line index: ${lineInd}) requested 
                in moveLineDown function doesn't exist. Array length: ${segmentLines.length}.`);
            const lineToMoveUp = segmentLines[lineInd];

            if (lineInd == segmentLines.length-1)
                throw new Error(`Line (segment index: ${segmentInd}; line index: ${lineInd}) requested 
                in moveLineDown function cannot be moved down as it's already the last line of its segment.`);

            segmentLines.splice(lineInd, 1);
            segmentLines.splice(lineInd+1, 0, lineToMoveUp);
        },
        deleteLine: function (segmentInd: number, lineInd: number) {
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (segment index: ${segmentInd}) requested 
                in deleteLine function doesn't exist. Array length: ${this.segments.length}.`);
            const segment = this.segments[segmentInd];
            const segmentLines = segment.segmentLines;

            if (segmentLines[lineInd] == null)
                throw new Error(`Line (segment index: ${segmentInd}; line index: ${lineInd}) requested 
                in deleteLine function doesn't exist. Array length: ${segmentLines.length}.`);
            const lineToMoveUp = segmentLines[lineInd];

            segmentLines.splice(lineInd, 1);
        },
        addLineToEndOfSegment: function (segmentInd: number) {
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (segment index: ${segmentInd}) requested 
                in addLineToEndOfSegment function doesn't exist. Array length: ${this.segments.length}.`);
            const segment = this.segments[segmentInd];
            const segmentLines = segment.segmentLines;
            segmentLines.push({
                "chordLine": "",
                "lyricLine": ""
            })
        }
    }
  })