<script lang="ts" setup>
import type { PropType } from "vue";

import type { ChordSheetSegment } from "@/stores/ChordSheetStore";

import ChordSheetPreviewLine from "./ChordSheetPreviewLine.vue";
</script>

<template>
    <div class="segment start-of-segment"
    :class="{ 'end-of-segment': segment.segmentLines.length < MIN_LINES_TO_SPLIT }">
      <p class="segment-title">{{ segment.segmentTitle }}</p>
      <ChordSheetPreviewLine v-for="lineNum in linesInFirstSplit"
        :line="segment.segmentLines[lineNum-1]">
      </ChordSheetPreviewLine>
    </div>
    <div v-if="segment.segmentLines.length >= MIN_LINES_TO_SPLIT" 
      v-for="furtherSplitNum in numberOfFurtherSplits"
      class="segment continuation-of-segment"
      :class="{ 'end-of-segment': furtherSplitNum==numberOfFurtherSplits }">
      <ChordSheetPreviewLine v-for="lineNumInFurtherSplit in MIN_LINES_IN_EACH_AFTER_SPLIT"
        :line="segment.segmentLines[
        lineNumInFurtherSplit-1+(MIN_LINES_IN_EACH_AFTER_SPLIT*(furtherSplitNum-1))+linesInFirstSplit]">
      </ChordSheetPreviewLine>
    </div> 
</template>

<script lang="ts">
// The number of lines that a section should have for it to be worth splitting between two columns.
// The first column will have at least MIN_LINES_TO_SPLIT-MIN_LINES_IN_EACH_AFTER_SPLIT lines.
const MIN_LINES_TO_SPLIT = 5;
// The number of lines that the next column must at least have for it to be worth splitting.
const MIN_LINES_IN_EACH_AFTER_SPLIT = 2;

export default {
  name: "chord-sheet-preview-segment",
  props: {
    segment: {
        type: Object as PropType<ChordSheetSegment>,
        required: true
    }
  },
  computed: {
    linesInFirstSplit () {
      return Math.min((MIN_LINES_TO_SPLIT-(1+(this.segment.segmentLines.length % MIN_LINES_IN_EACH_AFTER_SPLIT))), this.segment.segmentLines.length);
    },
    numberOfFurtherSplits() {
      return Math.floor((this.segment.segmentLines.length-this.linesInFirstSplit)/MIN_LINES_IN_EACH_AFTER_SPLIT);
    }
  }
}
</script>