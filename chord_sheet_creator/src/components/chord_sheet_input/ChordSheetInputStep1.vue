<script setup lang="ts">
import { InputFieldSize } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import Accordion from "../reusable/Accordion.vue";

import { mapState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
    <Accordion :stepNumber=1 title="Enter song details">
        <div id="step-1-section-content" 
            class="vertical-layout
            small-gap
            medium-vertical-padding">
            <div class="horizontal-layout small-gap">
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
            <div class="horizontal-layout small-gap">
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
    </Accordion>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-input-step1",
  computed: {
    ...mapState(useChordSheetStore, ["title", "artist", "key", "bpm", "timeSignature"])
  }
};
</script>