<script setup lang="ts">
import { InputFieldSize } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import { mapState } from "pinia";
import { useChordSheetStore } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>

<template>
    <div id="chord-input-accordion-content"
      class="vertical-layout
      small-vertical-gap
      medium-bottom-padding">
      <div id="chord-input-helper-text">
        <p>Update your sections, lyrics and chord lines.</p>
        <p>You can rearrange and delete sections next to each section title and add a new section at the bottom of this step. If a section is repeated identically later on in the song, the repeated section can have the same title as the previous one with no lines.</p>
        <p>You can add a new line to the bottom of a section at the top of each section. You can rearrange and delete lines next to each line. Ensure the chord and lyric lines are aligned to your needs by using spaces in both.</p>
      </div>
      <div id="chord-input" 
        class="vertical-layout
        medium-vertical-gap">
        <div v-for="(segment, segmentInd) in segments" 
          :id="'chord-input-section-'+segmentInd"
          class="vertical-layout
          small-vertical-gap">
          <InputField label="Section Title"
            :id="'section-title-'+segmentInd" 
            :modelValue="segment.segmentTitle"
            @update:modelValue="newValue => segment.segmentTitle = newValue"
            required
            :minSize="InputFieldSize.SMALL">
          </InputField>
          <div v-for="(line, lineInd) in segment.segmentLines"
            :id="'chord-input-line-s'+segmentInd+'l'+lineInd">
           <InputField label="Lyric Line"
              :id="'chord-input-lyric-line-s'+segmentInd+'l'+lineInd" 
              :modelValue="line.lyricLine"
              @update:modelValue="newValue => line.lyricLine = newValue"
              required>
           </InputField>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-input",
  computed: {
    ...mapState(useChordSheetStore, ["segments"])
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