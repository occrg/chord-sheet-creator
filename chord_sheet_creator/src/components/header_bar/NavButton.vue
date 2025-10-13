<template>
    <a :href=buttonURL 
        class="vertical-middle
        primary-background 
        large-vertical-padding 
        medium-horizontal-padding
        large-text">
        {{ buttonText }}
    </a>
</template>
    
<script lang="ts">
export default {
    name: "nav-button",
    props: {
        buttonText: String,
        buttonURL: String
    }
};
</script>