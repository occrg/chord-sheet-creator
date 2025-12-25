import { defineStore } from "pinia"

export const useDOMStore = defineStore("dom", {
    state: () => {
        return {
            chordSheetPreviewRef: null as HTMLElement | null
        }
    }
  })