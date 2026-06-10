<script setup lang="ts">
import type { PropType } from "vue";

import InputField from "../reusable/InputField.vue";

import { ButtonStyle } from "../reusable/Button.vue";
import Button from "../reusable/Button.vue";
import { IconChoice } from "../reusable/Icon.vue";  

import { useChordSheetSegmentsStore } from "@/stores/ChordSheetSegmentsStore";
import type { ChordSheetSegment, ChordSheetLine } from "@/stores/ChordSheetSegmentsStore";

const chordSheetSegementsStore = useChordSheetSegmentsStore();
</script>
    
<template>
    <div :id="'chord-input-line-s'+segmentInd+'l'+lineInd"
        class="horizontal-layout
        wrap-around
        primary-right
        medium-horizontal-gap
        extra-small-vertical-gap">
        <div :id="'chord-input-line-lines-s'+segmentInd+'l'+lineInd"
            class="vertical-layout
            fill-space
            extra-small-vertical-gap
            medium-left-padding">
            <InputField label="Chord Line"
                :id="'chord-input-chord-line-s'+segmentInd+'l'+lineInd" 
                :modelValue="line.chordLine"
                @update:modelValue="newValue => line.chordLine = newValue"
                required>
            </InputField>
            <InputField label="Lyric Line"
                :id="'chord-input-lyric-line-s'+segmentInd+'l'+lineInd" 
                :modelValue="line.lyricLine"
                @update:modelValue="newValue => line.lyricLine = newValue"
                required>
            </InputField>
        </div>
        <div :id="'chord-input-line-buttons-s'+segmentInd+'l'+lineInd"
            class="horizontal-layout
            secondary-middle
            small-horizontal-gap">
            <div class="touchable-area-height
                touchable-area-width">
                <Button @buttonClicked="chordSheetSegementsStore.moveLineUp(segmentInd, lineInd)"
                    v-if="lineInd!=0"
                    :buttonStyle="ButtonStyle.SECONDARY"
                    :iconChoice="IconChoice.CHEVRON_UP">
                </Button>
            </div>
            <div class="touchable-area-height
                touchable-area-width">
                <Button @buttonClicked="chordSheetSegementsStore.moveLineDown(segmentInd, lineInd)"
                    v-if="lineInd!=segment.segmentLines.length-1"
                    :buttonStyle="ButtonStyle.SECONDARY"
                    :iconChoice="IconChoice.CHEVRON_DOWN">
                </Button>
            </div>
            <div class="touchable-area-height
                touchable-area-width">
                <Button @buttonClicked="chordSheetSegementsStore.deleteLine(segmentInd, lineInd)"
                    :buttonStyle="ButtonStyle.SECONDARY"
                    :iconChoice="IconChoice.BIN">
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "chord-input",
    props: {
        segment: {
            type: Object as PropType<ChordSheetSegment>,
            required: true
        },
        segmentInd: {
            type: Number,
            required: true
        },
        line: {
            type: Object as PropType<ChordSheetLine>,
            required: true
        },
        lineInd: {
            type: Number,
            required: true
        }
    }
};
</script>