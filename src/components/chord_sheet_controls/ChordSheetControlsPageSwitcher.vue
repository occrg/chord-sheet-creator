<script setup lang="ts">
import { mapActions, mapState } from "pinia";
import { useChordSheetControlsStore } from "@/stores/ChordSheetControlsStore";

import { ButtonStyle } from "../reusable/Button.vue";
import Button from "../reusable/Button.vue";
import { IconChoice } from "../reusable/Icon.vue";  
</script>

<template>
    <div v-if="maxPage > 0" 
      id="page-switch-buttons" 
      class="horizontal-layout
      small-horizontal-gap
      medium-horizontal-padding">
      <div class="touchable-area-height
      touchable-area-width">
        <Button @buttonClicked="decrementPage"
            v-if="currentlySelectedPage > 0"
            :buttonStyle="ButtonStyle.SECONDARY"
            :iconChoice="IconChoice.CHEVRON_LEFT">
        </Button>
      </div>
      <div class="vertical-layout primary-middle key-text">
          {{ userDisplayedCurrentlySelectedPage }} / {{userDisplayedMaxPage}}
      </div>
      <div class="touchable-area-height
      touchable-area-width">
        <Button @buttonClicked="incrementPage"
            v-if="currentlySelectedPage < maxPage"
            :buttonStyle="ButtonStyle.SECONDARY"
            :iconChoice="IconChoice.CHEVRON_RIGHT">
        </Button>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-controls-page-switcher",
  computed: {
    ...mapState(useChordSheetControlsStore, 
      ["maxPage", "userDisplayedMaxPage", "currentlySelectedPage", "userDisplayedCurrentlySelectedPage"])
  },
  methods: {
    ...mapActions(useChordSheetControlsStore, ["incrementPage", "decrementPage"])
  }
};
</script>