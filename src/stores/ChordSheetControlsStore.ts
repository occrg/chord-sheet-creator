import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

import type { Ref, ComputedRef } from "vue";

import { useChordSheetAcrossPagesStore } from "./ChordSheetAcrossPagesStore";


export const useChordSheetControlsStore = defineStore("chord-sheet-controls", () => {
    const chordSheetAcrossPagesStore = useChordSheetAcrossPagesStore();
    
    let maxPage: ComputedRef<number> = reactive(computed(() => {
        let maxPage = 0;
        if (chordSheetAcrossPagesStore.pages && chordSheetAcrossPagesStore.pages.length-1 > 0)
            maxPage = chordSheetAcrossPagesStore.pages.length-1;
        return maxPage; 
    }));
    let userDisplayedMaxPage: ComputedRef<number> =
        reactive(computed(() => maxPage.value+1));

    let currentlySelectedPage: Ref<number> = ref(0);
    let userDisplayedCurrentlySelectedPage: ComputedRef<number> = 
        reactive(computed(() => currentlySelectedPage.value+1));

    function incrementPage () {
        if (!(currentlySelectedPage.value < maxPage.value))
                throw new Error(`Trying to increment currentlySelectedPage (${currentlySelectedPage.value}) when ` + 
                    `it is not smaller than maxPage (${maxPage.value}).`);
        currentlySelectedPage.value += 1;
    }

    function decrementPage () {
        if (!(currentlySelectedPage.value > 0))
                throw new Error(`Trying to decrement currentlySelectedPage (${currentlySelectedPage.value}) when ` + 
                    `it is not more than 0.`);
        currentlySelectedPage.value -= 1;
    }

    return { maxPage, userDisplayedMaxPage, currentlySelectedPage, userDisplayedCurrentlySelectedPage, incrementPage, 
        decrementPage };
})