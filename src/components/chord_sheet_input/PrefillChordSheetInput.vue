<script setup lang="ts">
import { InputType } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import { mapActions } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
  <div id="prefill-chord-sheet-input-accordion-content" 
      class="medium-bottom-padding">
      <InputField label="Chord Sheet Content"
          id="chord-sheet-content-input" 
          :modelValue="lyrics"
          @update:modelValue="newValue => lyrics = newValue"
          required
          :inputType="InputType.MULTILINE"></InputField>
  </div>
</template>

<script lang="ts">
export default {
    name: "prefill-chord-sheet-input",
    data () {
      return {
        lyrics: "" as string
      }
    },
  props: {
    completeProcessTrigger: Number
  },
  watch: {
    completeProcessTrigger: {
      handler(newValue: boolean) {
        if (newValue) {
          this.createChordSheet();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(useChordSheetStore, ["storeChordSheetSegmentsFromPrefillInput"]),
    createChordSheet: function () {
      const parser = new DOMParser();
      try {
        this.storeChordSheetSegmentsFromPrefillInput(this.lyrics);
      } catch (err) {
        console.error(err);
      }
    },
  }

};
</script>