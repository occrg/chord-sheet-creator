import { defineStore } from "pinia"

export interface ChordSheetLine {
    chordLine: string,
    lyricLine: string
}

export interface ChordSheetSegment {
    segmentTitle: string,
    segmentLines: ChordSheetLine[]
}

export interface ChordSheetSegmentsData {
    segments: ChordSheetSegment[]
}

export const useChordSheetSegmentsStore = defineStore("chord-sheet-segments", {
    state: () => {
        return {
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
        storeChordSheetSegmentsFromJsonDataInput: function (jsonDataInput: ChordSheetSegmentsData) {
            this.segments = jsonDataInput.segments;
        },
        storeChordSheetSegmentsFromLyrics: function (lyrics: string) {
            let cleanedUpLyrics = this.cleanUpLyricInput(lyrics);
            let segmentSplitterString = this.createSegmentSplitterString(cleanedUpLyrics);
            let chordSheetSegmentsFromLyrics = cleanedUpLyrics.split(segmentSplitterString);
            
            this.segments = [];
            
            chordSheetSegmentsFromLyrics.forEach((segmentLineString, ind) => {
                let segmentTitle: string = `Segment ${ind}`;

                let chordSheetSegmentSplitIntoLines = segmentLineString.split("\n");

                let findSegmentTitleResult = this.findSegmentTitle(chordSheetSegmentSplitIntoLines, ind);
                if (findSegmentTitleResult) {
                    segmentTitle = findSegmentTitleResult;
                    chordSheetSegmentSplitIntoLines.shift();
                }

                let chordSheetSegment: ChordSheetSegment = {
                    segmentTitle: segmentTitle,
                    segmentLines: []
                }
                
                chordSheetSegmentSplitIntoLines.forEach((chordSheetLineInSegment) => {
                    chordSheetSegment.segmentLines.push({
                        chordLine: "",
                        lyricLine: chordSheetLineInSegment
                    });
                });
                
                this.segments.push(chordSheetSegment);
            });
        },
        cleanUpLyricInput: function (lyrics: string): string {
            const captureContentBeforeTrailingSpacesRegex = /([\w\W]+?) *$/gm;
            let lyricsWithoutBlankLines = lyrics.replace(captureContentBeforeTrailingSpacesRegex, `$1`);

            const leadingAndTrailingNewLinesRegex = /^[\r\n]+|[\r\n]+$/g;
            let cleanedUpLyrics = lyricsWithoutBlankLines.replace(leadingAndTrailingNewLinesRegex, "");

            return cleanedUpLyrics;
        },
        createSegmentSplitterString: function (lyrics: string): string {
            return lyrics.includes("\n\n\n") ? "\n\n\n" : "\n\n";
        },
        findSegmentTitle: function (chordSheetSegmentSplitIntoLines: string[], 
            chordSheetSegmentIndex: number): string | null {
            let findSegmentTitleResult = null;
            const segmentTitleRegex = /^\[([\w\W]+?)\]$/;

            if (!(chordSheetSegmentSplitIntoLines.length > 0) || 
                chordSheetSegmentSplitIntoLines[0] == null)
                throw new Error(`Chord sheet segment (ind: ${chordSheetSegmentIndex}) ` + 
                    `contains no lines when splitting.`);

            let firstLineOfSegment: string = chordSheetSegmentSplitIntoLines[0];
            let segmentTitleMatch = segmentTitleRegex.exec(firstLineOfSegment);

            if (segmentTitleMatch != null) {
                if (segmentTitleMatch[1] == null)
                    throw new Error(`segmentTitleMatch for chordSheetSegment (ind: ${chordSheetSegmentIndex}) ` + 
                    `appeared to match but array not in expected form`);
                findSegmentTitleResult = segmentTitleMatch[1];
            }

            return findSegmentTitleResult;
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