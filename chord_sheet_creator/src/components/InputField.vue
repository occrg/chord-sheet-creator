<template>
  <label>{{label}}
    <input type="text" 
      :id=id 
      :required=required 
      v-model="value">
  </label>
</template>

<script lang="ts">
export default {
  name: "input-field",
  props: {
    label: String,
    id: String,
    modelValue: String,
    required: Boolean
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