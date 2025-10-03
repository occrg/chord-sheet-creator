import { defineStore } from "pinia"

export const useChordSheetStore = defineStore("chord-sheet", {
    state: () => {
        return {
            title: "" as string,
            artist: "" as string,
            key: "" as string,
            bpm: "" as string,
            timeSignature: "" as string,
        }
    }
  })