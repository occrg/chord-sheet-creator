<script lang="ts" setup>
import type { PropType } from "vue";

import type { ChordSheetLine } from "@/stores/ChordSheetStore";

import ChordSheetPreviewLine from "./ChordSheetPreviewLine.vue";
</script>

<template>
    <div class="segment start-of-segment"
    :class="{ 'end-of-segment': segmentChunks.length == 1 }">
      <p class="segment-title">{{ segmentTitle }}</p>
      <ChordSheetPreviewLine v-for="lineInFirstChunk in segmentChunks[0]" :line="lineInFirstChunk">
      </ChordSheetPreviewLine>
    </div>
    <div v-for="chunkNum in (segmentChunks.length - 1)"
      class="segment continuation-of-segment"
      :class="{ 'end-of-segment': chunkNum == (segmentChunks.length - 1) }">
      <ChordSheetPreviewLine v-for="lineInFurtherChunk in segmentChunks[chunkNum]" :line="lineInFurtherChunk">
      </ChordSheetPreviewLine>
    </div> 
</template>

<script lang="ts">
export default {
  name: "chord-sheet-preview-segment",
  props: {
    segmentTitle: {
      type: String,
      required: true
    },
    segmentChunks: {
        type: Array as PropType<Array<ChordSheetLine>>,
        required: true
    }
  }
}
</script>