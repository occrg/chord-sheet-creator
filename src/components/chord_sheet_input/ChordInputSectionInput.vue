<script setup lang="ts">
import type { PropType } from "vue";

import { InputFieldSize } from "../reusable/InputField.vue";
import InputField from "../reusable/InputField.vue";

import { ButtonStyle } from "../reusable/Button.vue";
import Button from "../reusable/Button.vue";
import { IconChoice } from "../reusable/Icon.vue";    

import ChordInputLineInput from "./ChordInputLineInput.vue";

import { useChordSheetStore } from "@/stores/ChordSheetStore";
import type { ChordSheetSegment } from "@/stores/ChordSheetStore";

const chordSheetStore = useChordSheetStore();
</script>
    
<template>
    <div :id="'chord-input-section-'+segmentInd"
        class="vertical-layout
        small-vertical-gap">
        <div :id="'chord-input-section-section-'+segmentInd"
            class="horizontal-layout
            medium-horizontal-gap
            extra-small-vertical-gap">
            <InputField label="Section Title"
                :id="'section-title-'+segmentInd" 
                :modelValue="segment.segmentTitle"
                @update:modelValue="newValue => segment.segmentTitle = newValue"
                required
                :minSize="InputFieldSize.SMALL">
            </InputField>
            <div :id="'chord-input-section-buttons-s'+segmentInd"
                class="horizontal-layout
                secondary-middle
                small-horizontal-gap">
                <div class="touchable-area-height
                    touchable-area-width">
                    <Button @buttonClicked="chordSheetStore.moveSegmentUp(segmentInd)"
                        v-if="segmentInd!=0"
                        :buttonStyle="ButtonStyle.SECONDARY"
                        :iconChoice="IconChoice.CHEVRON_UP">
                    </Button>
                </div>
                <div class="touchable-area-height
                    touchable-area-width">
                    <Button @buttonClicked="chordSheetStore.moveSegmentDown(segmentInd)"
                        v-if="segmentInd!=segmentsLength-1"
                        :buttonStyle="ButtonStyle.SECONDARY"
                        :iconChoice="IconChoice.CHEVRON_DOWN">
                    </Button>
                </div>
                <div class="touchable-area-height
                    touchable-area-width">
                    <Button @buttonClicked="chordSheetStore.deleteSegment(segmentInd)"
                        :buttonStyle="ButtonStyle.SECONDARY"
                        :iconChoice="IconChoice.BIN">
                    </Button>
                </div>
                <Button @buttonClicked="chordSheetStore.addLineToEndOfSegment(segmentInd)"
                    :buttonStyle="ButtonStyle.SECONDARY"
                    text="Line"
                    :iconChoice="IconChoice.PLUS">
                </Button>
            </div>
        </div>
        <ChordInputLineInput v-for="(line, lineInd) in segment.segmentLines"
            :segment="segment"
            :segmentInd="segmentInd"
            :line="line"
            :lineInd="lineInd">
        </ChordInputLineInput>
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
        segmentsLength: {
            type: Number,
            required: true
        }
    }
};
</script>