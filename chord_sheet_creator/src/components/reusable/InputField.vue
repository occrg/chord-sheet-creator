<script lang="ts" setup>
import type { PropType } from "vue";
</script>

<template>
  <div class="fill-space
    primary-background-shade
    medium-border-radius
    text-selection
    medium-shadow
    bottom-border">
    <label :id=id 
      :class="INPUT_FIELD_SIZE_TO_MIN_WIDTH_CLASS_MAPPING[minSize]">
      <div class="support-text
        medium-top-padding
        medium-horizontal-padding">
        {{label}}
      </div>
      <div class="horizontal-layout">
        <input v-if="inputType == InputType.SINGLELINE"
          type="text" 
          :required=required 
          v-model="value"
          class="key-text
          fill-space
          medium-bottom-padding
          medium-horizontal-padding">
        <textarea v-if="inputType == InputType.MULTILINE"
          type="text" 
          :required=required 
          v-model="value"
          class="key-text
          large-height
          fill-space
          medium-bottom-padding
          medium-horizontal-padding"></textarea>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
export enum InputFieldSize {
    SMALL,
    MEDIUM
}

export enum InputType {
    SINGLELINE,
    MULTILINE
}

const INPUT_FIELD_SIZE_TO_MIN_WIDTH_CLASS_MAPPING = {
  [`${InputFieldSize.SMALL}`]: "small-min-width",
  [`${InputFieldSize.MEDIUM}`]: "medium-min-width"
};

export default {
  name: "input-field",
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    required: Boolean,
    minSize: {
      type: Number as PropType<InputFieldSize>,
      required: false,
      default: InputFieldSize.MEDIUM
    },
    inputType: {
      type: Number as PropType<InputType>,
      required: false,
      default: InputType.SINGLELINE
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>