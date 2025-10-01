import { defineStore } from "pinia"

export const useChordSheetStore = defineStore("chord-sheet", {
    state: () => {
        return {
            title: null as string | null,
            artist: null as string | null,
            key: null as string | null,
            bpm: null as string | null,
            time_signature: null as string | null,
        }
    }
  })