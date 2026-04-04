<script setup lang="ts">
import { InputFieldSize } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import { mapState } from "pinia";
import { useChordSheetDetailsStore } from "@/stores/ChordSheetDetailsStore";

const chordSheetDetailsStore = useChordSheetDetailsStore();
</script>

<template>
    <div id="song-details-chord-sheet-input-accordion-content" 
        class="vertical-layout
        small-vertical-gap
        medium-vertical-padding">
        <div class="horizontal-layout
          small-vertical-gap
          small-horizontal-gap
          wrap-around">
            <InputField label="Title"
            id="song-title-input" 
            :modelValue="chordSheetDetailsStore.title"
            @update:modelValue="newValue => chordSheetDetailsStore.title = newValue"
            required>
            </InputField>
            <InputField label="Artist"
            id="song-artist-input" 
            :modelValue="chordSheetDetailsStore.artist"
            @update:modelValue="newValue => chordSheetDetailsStore.artist = newValue"
            required>
            </InputField>
        </div>
        <div class="horizontal-layout
          small-vertical-gap
          small-horizontal-gap
          wrap-around">
            <InputField label="Key"
            id="song-key-input" 
            :modelValue="chordSheetDetailsStore.key"
            @update:modelValue="newValue => chordSheetDetailsStore.key = newValue"
            required
            :minSize="InputFieldSize.SMALL">
            </InputField>
            <InputField label="Bpm"
            id="song-bpm-input" 
            :modelValue="chordSheetDetailsStore.bpm"
            @update:modelValue="newValue => chordSheetDetailsStore.bpm = newValue"
            required
            :minSize="InputFieldSize.SMALL">
            </InputField>
            <InputField label="Time signature"
            id="song-time-signature-input" 
            :modelValue="chordSheetDetailsStore.timeSignature"
            @update:modelValue="newValue => chordSheetDetailsStore.timeSignature = newValue"
            required
            :minSize="InputFieldSize.SMALL">
            </InputField>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "song-details-chord-sheet-input",
  computed: {
    ...mapState(useChordSheetDetailsStore, ["title", "artist", "key", "bpm", "timeSignature"])
  },
  props: {
    completeProcessTrigger: Number
  },
  watch: {
    completeProcessTrigger(newValue: boolean) {
      if (newValue) {
        // Do nothing.
      }
    }
  }
};
</script>