<script setup lang="ts">
import { mapActions, mapState } from "pinia";
import { useChordSheetControlsStore } from "@/stores/ChordSheetControlsStore";

import { ButtonStyle } from "../reusable/Button.vue";
import Button from "../reusable/Button.vue";
import { IconChoice } from "../reusable/Icon.vue";  
</script>

<template>
    <div id="page-switch-buttons" 
    class="horizontal-layout
    small-horizontal-gap
    medium-horizontal-padding">
    <Button @buttonClicked="decrementPage"
        :buttonStyle="ButtonStyle.SECONDARY"
        :iconChoice="IconChoice.CHEVRON_LEFT">
    </Button>
    <div class="vertical-layout primary-middle key-text">
        {{ userDisplayedCurrentlySelectedPage }} / {{userDisplayedMaxPage}}
    </div>
    <Button @buttonClicked="incrementPage"
        :buttonStyle="ButtonStyle.SECONDARY"
        :iconChoice="IconChoice.CHEVRON_RIGHT">
    </Button>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-controls-download-buttons",
  computed: {
    ...mapState(useChordSheetControlsStore, ["userDisplayedMaxPage", "userDisplayedCurrentlySelectedPage"])
  },
  methods: {
    ...mapActions(useChordSheetControlsStore, ["incrementPage", "decrementPage"])
  }
};
</script>