import { defineStore } from "pinia"

export interface ChordSheetLine {
    chordLine: string,
    lyricLine: string
}

export interface ChordSheetSegment {
    segmentTitle: string,
    segmentLines: ChordSheetLine[]
}

export interface ChordSheetData {
    title: string,
    artist: string,
    key: string,
    bpm: string,
    timeSignature: string,
    segments: ChordSheetSegment[]
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
        storeChordSheetSegmentsFromPrefillInput: function (prefillInput: string) {
            const trimmedPrefillInput = prefillInput.trim();
            if (this.stringIsJsonParsable(trimmedPrefillInput)) {
                const jsonPrefillInput = JSON.parse(prefillInput);
                this.storeChordSheetSegmentsFromJsonDataInput(jsonPrefillInput);
            } else {
                this.storeChordSheetSegmentsFromLyrics(trimmedPrefillInput);
            }
        },
        stringIsJsonParsable: function (stringToCheck: string): boolean {
            let stringIsJsonParsable = true;
            try {
                JSON.parse(stringToCheck);
            } catch (err) {
                stringIsJsonParsable = false;
            }
            return stringIsJsonParsable;
        },
        storeChordSheetSegmentsFromJsonDataInput: function (jsonDataInput: ChordSheetData) {
            this.title = jsonDataInput.title;
            this.artist = jsonDataInput.artist;
            this.key = jsonDataInput.key;
            this.bpm = jsonDataInput.bpm;
            this.timeSignature = jsonDataInput.timeSignature;
            this.segments = jsonDataInput.segments;
        },
        storeChordSheetSegmentsFromLyrics: function (lyrics: string) {
            let chordSheetSegmentsFromLyrics = lyrics.split("\n\n");
            this.segments = [];
            
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
        moveSegmentUp: function (segmentInd: number) {            
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (${segmentInd}) requested in moveSegmentUp 
                function doesn't exist. Array length: ${this.segments.length}.`);
            const segmentToMoveUp = this.segments[segmentInd];
            
            if (segmentInd == 0)
                throw new Error(`Segment (index: ${segmentInd}) requested 
                in moveSegmentUp function cannot be moved up as it's already the first segment.`);

            this.segments.splice(segmentInd, 1);
            this.segments.splice(segmentInd-1, 0, segmentToMoveUp);
        },
        moveSegmentDown: function (segmentInd: number) {
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (${segmentInd}) requested 
                in moveSegmentDown function doesn't exist. Array length: ${this.segments.length}.`);
            const segmentToMoveDown = this.segments[segmentInd];

            if (segmentInd == this.segments.length-1)
                throw new Error(`Segment (index: ${segmentInd}) requested 
                in moveSegmentDown function cannot be moved down as it's already the last segment.`);

            this.segments.splice(segmentInd, 1);
            this.segments.splice(segmentInd+1, 0, segmentToMoveDown);
        },
        deleteSegment: function (segmentInd: number) {
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (${segmentInd}) requested 
                in deleteSegment function doesn't exist. Array length: ${this.segments.length}.`);

            this.segments.splice(segmentInd, 1);
        },
        addSegmentToEnd: function () {
            this.segments.push({
                segmentTitle: "",
                segmentLines: []
            });
        },
        moveLineUp: function (segmentInd: number, lineInd: number) {            
            if (this.segments[segmentInd] == null)
                throw new Error(`Segment index (${segmentInd}) requested in moveLineUp 
            function doesn't exist. Array length: ${this.segments.length}.`);
            const segment = this.segments[segmentInd];
            const segmentLines = segment.segmentLines;
            
            if (segmentLines[lineInd] == null)
                throw new Error(`Line index (${lineInd}) requested in moveLineUp function 
            doesn't exist. Array length: ${segmentLines.length}.`);
            const lineToMoveUp = segmentLines[lineInd];

            if (lineInd == 0)
                throw new Error(`Line (segment index: ${segmentInd}; line index: ${lineInd}) requested 
                in moveLineUp function cannot be moved up as it's already the first line of its segment.`);

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
            const lineToMoveDown = segmentLines[lineInd];

            if (lineInd == segmentLines.length-1)
                throw new Error(`Line (segment index: ${segmentInd}; line index: ${lineInd}) requested 
                in moveLineDown function cannot be moved down as it's already the last line of its segment.`);

            segmentLines.splice(lineInd, 1);
            segmentLines.splice(lineInd+1, 0, lineToMoveDown);
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