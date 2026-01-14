<script lang="ts" setup>
import type { PropType } from "vue";

import type { ChordSheetLine } from "@/stores/ChordSheetStore";

import ChordSheetPreviewLine from "./ChordSheetPreviewLine.vue";
</script>

<template>
    <div class="segment"
      :class="{
      'start-of-segment': indexOfThisChunkInItsSegment == 0,
      'continuation-of-segment': indexOfThisChunkInItsSegment != 0,
      'end-of-segment': indexOfThisChunkInItsSegment == (numberOfChunksInThisChunksSegment - 1) }">
      <p v-if="indexOfThisChunkInItsSegment == 0"
        class="segment-title">{{ segmentTitle }}
      </p>
      <ChordSheetPreviewLine v-for="line in segmentChunk" :line="line">
      </ChordSheetPreviewLine>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-preview-chunk",
  props: {
    segmentTitle: {
      type: String,
      required: true
    },
    segmentChunk: {
        type: Array as PropType<Array<ChordSheetLine>>,
        required: true
    },
    indexOfThisChunkInItsSegment: {
      type: Number,
      required: true
    },
    numberOfChunksInThisChunksSegment: {
      type: Number,
      required: true
    }
  }
}
</script>