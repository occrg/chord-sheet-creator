<script lang="ts" setup>
import type { PropType } from "vue";

import type { ChordSheetLine } from "@/stores/ChordSheetStore";
</script>

<template>
    <div class="line">
        <div class="chord-line">
            {{ line.chordLine.replace(/  /gi, " &nbsp;") }}
        </div>
        <div class="lyric-line">
            {{ line.lyricLine.replace(/  /gi, " &nbsp;") }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "chord-sheet-preview-line",
  props: {
    line: {
        type: Object as PropType<ChordSheetLine>,
        required: true
    }
  }
}
</script>