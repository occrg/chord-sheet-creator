import { defineStore } from "pinia"

export const useDOMStore = defineStore("dom", {
    state: () => {
        return {
            chordSheetPageRefs: [] as HTMLElement[]
        }
    }
  })