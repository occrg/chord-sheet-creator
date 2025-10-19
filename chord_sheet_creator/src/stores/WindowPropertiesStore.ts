import { defineStore } from "pinia"

export const useWindowPropertiesStore = defineStore("window-properties", {
    state: () => {
        return {
            pixelsInAMilimetre: 3.77953
        }
    }
  })