<script setup lang="ts">
import type { Component } from "vue";
import { markRaw } from "vue";

import Accordion from "../reusable/Accordion.vue";
import { AccordionState } from "../reusable/Accordion.vue";

import SongDetailsChordSheetInput from "./SongDetailsChordSheetInput.vue";
import PrefillChordSheetInput from "./PrefillChordSheetInput.vue";
</script>

<template>
    <div id="input-section" 
      class="vertical-layout
      medium-vertical-gap
      fill-space
      vertical-scroll
      large-vertical-padding
      large-horizontal-padding">
      <Accordion v-for="(step, ind) in CHORD_SHEET_INPUT_STEPS"
        :accordionOrder="ind"
        :title="step.title"
        :completeButtonText="step.completeButtonText"
        :showSkipButton="step.showSkipButton"
        :state="getAccordionState(ind)"
        @complete="completeAccordion"
        @skip="skipAccordion"
        @toggle="toggleAccordion">
        <component :is="step.component" 
          :completeProcessTrigger="getCompleteProcessTrigger(ind)"></component>
      </Accordion>
    </div>
</template>

<script lang="ts">
interface ChordSheetInputStep {
    component: Component,
    title: string,
    completeButtonText: string,
    showSkipButton: boolean
};

interface ChordSheetInputStepProp {
  accordionState: AccordionState,
  completeProcessTrigger: number
}

const CHORD_SHEET_INPUT_STEPS: ChordSheetInputStep[] = [
  {
    component: SongDetailsChordSheetInput,
    title: "Enter song details",
    completeButtonText: "Continue",
    showSkipButton: true
  },
  {
    component: PrefillChordSheetInput,
    title: "Prefill chord sheet",
    completeButtonText: "Create",
    showSkipButton: false
  }
]

export default {
  name: "chord-sheet-input",
  data () {
    return {
      stepProperties: [
        {
          accordionState: AccordionState.OPEN,
          completeProcessTrigger: 0
        },
        {
          accordionState: AccordionState.CLOSED,
          completeProcessTrigger: 0
        }
      ] as ChordSheetInputStepProp[]
    }
  },
  methods: {
    getAccordionState: function (accordionOrder: number): AccordionState {
      if (accordionOrder > (this.stepProperties.length - 1)) {
        throw new ReferenceError("Accordion to get doesn't exist");
      }

      // Asserting that this isn't undefined because of length check above.
      let accordionState: AccordionState = this.stepProperties[accordionOrder]!.accordionState;
      return accordionState;
    },
    getCompleteProcessTrigger: function (stepOrder: number): number {
      if (stepOrder > (this.stepProperties.length - 1)) {
        throw new ReferenceError("Step to get doesn't exist");
      }

      // Asserting that this isn't undefined because of length check above.
      let completeProcessTrigger: number = this.stepProperties[stepOrder]!.completeProcessTrigger;
      return completeProcessTrigger;
    },
    completeAccordion: function (accordionOrderCompleted: number) {
      this.closedAccordionOpenNextAccordion(accordionOrderCompleted);
      this.getCompleteProcessTrigger(accordionOrderCompleted);
      // Asserting as not undefined because of check for this in above function.
      this.stepProperties[accordionOrderCompleted]!.completeProcessTrigger += 1;
    },
    skipAccordion: function (accordionOrderSkipped: number) {
      this.closedAccordionOpenNextAccordion(accordionOrderSkipped);
    },
    toggleAccordion: function (accordionOrderToggled: number) {
      // Checking that accordion state exists here means I'm asserting that it 
      // isn't undefined in the rest of the function.
      const currentState = this.getAccordionState(accordionOrderToggled);
      if (currentState == AccordionState.CLOSED) {
        for (let currentAccordionOrder = 0; 
          currentAccordionOrder < this.stepProperties.length; 
          currentAccordionOrder++) {
          this.stepProperties[currentAccordionOrder]!.accordionState = AccordionState.CLOSED;
        }
        this.stepProperties[accordionOrderToggled]!.accordionState = AccordionState.OPEN;
      }
      else if (currentState == AccordionState.OPEN) 
        this.stepProperties[accordionOrderToggled]!.accordionState = AccordionState.CLOSED;
    },
    closedAccordionOpenNextAccordion: function (accordionOrderToClose: number) {
      this.getAccordionState(accordionOrderToClose);
      // Asserting as not undefined because of check for this in above function.
      this.stepProperties[accordionOrderToClose]!.accordionState = AccordionState.CLOSED;
      
      try {
        this.getAccordionState(accordionOrderToClose + 1);
        // Asserting as not undefined because of check for this in above function.
        this.stepProperties[accordionOrderToClose + 1]!.accordionState = AccordionState.OPEN;
      } catch (ReferenceError) {
        // No need to take action on error since the last accordion was closed 
        // and so there was no subsequent accordion to open. 
      }
    }
  }
};
</script>