<script setup lang="ts">
import { InputFieldSize } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import { mapState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
    <div id="step-1-section-content" 
        class="vertical-layout
        small-gap
        medium-vertical-padding">
        <div class="horizontal-layout
          small-gap
          wrap-around">
            <InputField label="Title"
            id="song-title-input" 
            :modelValue="chordSheetStore.title"
            @update:modelValue="newValue => chordSheetStore.title = newValue"
            required>
            </InputField>
            <InputField label="Artist"
            id="song-artist-input" 
            :modelValue="chordSheetStore.artist"
            @update:modelValue="newValue => chordSheetStore.artist = newValue"
            required>
            </InputField>
        </div>
        <div class="horizontal-layout
          small-gap
          wrap-around">
            <InputField label="Key"
            id="song-key-input" 
            :modelValue="chordSheetStore.key"
            @update:modelValue="newValue => chordSheetStore.key = newValue"
            required
            :minSize="InputFieldSize.SMALL">
            </InputField>
            <InputField label="Bpm"
            id="song-bpm-input" 
            :modelValue="chordSheetStore.bpm"
            @update:modelValue="newValue => chordSheetStore.bpm = newValue"
            required
            :minSize="InputFieldSize.SMALL">
            </InputField>
            <InputField label="Time signature"
            id="song-time-signature-input" 
            :modelValue="chordSheetStore.timeSignature"
            @update:modelValue="newValue => chordSheetStore.timeSignature = newValue"
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
    ...mapState(useChordSheetStore, ["title", "artist", "key", "bpm", "timeSignature"])
  },
  props: {
    completeProcessTrigger: Boolean,
    stepOrder: {
      type: Number,
      required: true
    }
  },
  watch: {
    completeProcessTrigger(newValue: boolean) {
      if (newValue) {
        // Do nothing.
        this.$emit('completeProcessFinished', this.stepOrder)
      }
    }
  },
  emits: ["completeProcessFinished"]
};
</script>