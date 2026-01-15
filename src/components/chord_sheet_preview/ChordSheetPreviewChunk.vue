<script lang="ts" setup>
import type { PropType } from "vue";

import type { ChordSheetLine } from "@/stores/ChordSheetStore";

import ChordSheetPreviewLine from "./ChordSheetPreviewLine.vue";
</script>

<template>
    <div class="segment"
      :class="{
      'start-of-segment': chunk.segmentIndex == 0,
      'continuation-of-segment': chunk.segmentIndex != 0,
      'end-of-segment': chunk.segmentIndex == (chunk.numberOfChunksInSegmentsIndex - 1) }">
      <p v-if="chunk.segmentIndex == 0"
        class="segment-title">{{ chunk.chunksSegmentsTitle }}
      </p>
      <ChordSheetPreviewLine v-for="line in chunk.segmentLines"
        :line="line">
      </ChordSheetPreviewLine>
    </div>
</template>

<script lang="ts">
export interface ChordSheetSegmentChunk {
    segmentIndex: number,
    chunksSegmentsTitle: string,
    numberOfChunksInSegmentsIndex: number,
    segmentLines: ChordSheetLine[]
}

export default {
  name: "chord-sheet-preview-chunk",
  props: {
    chunk: {
        type: Object as PropType<ChordSheetSegmentChunk>,
        required: true
    }
  }
}
</script>