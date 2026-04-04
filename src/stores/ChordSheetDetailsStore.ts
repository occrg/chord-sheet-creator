import { defineStore } from "pinia"

export interface ChordSheetDetailsData {
    title: string,
    artist: string,
    key: string,
    bpm: string,
    timeSignature: string
}

export const useChordSheetDetailsStore = defineStore("chord-sheet-details", {
    state: () => {
        return {
            title: "" as string,
            artist: "" as string,
            key: "" as string,
            bpm: "" as string,
            timeSignature: "" as string
        }
    },
    actions: {
        storeChordSheetDetailsFromPrefillInput: function (prefillInput: string) {
            const trimmedPrefillInput = prefillInput.trim();
            if (this.stringIsJsonParsable(trimmedPrefillInput)) {
                const jsonPrefillInput = JSON.parse(prefillInput);
                this.storeChordSheetDetailsFromJsonDataInput(jsonPrefillInput);
            } else {
                // Do nothing as chord sheet details not taken from lyrics string.
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
        storeChordSheetDetailsFromJsonDataInput: function (jsonDataInput: ChordSheetDetailsData) {
            this.title = jsonDataInput.title;
            this.artist = jsonDataInput.artist;
            this.key = jsonDataInput.key;
            this.bpm = jsonDataInput.bpm;
            this.timeSignature = jsonDataInput.timeSignature;
        }
    }
  })