<template>
    <a :href=buttonURL
        :target=targetValue 
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
        buttonText: {
            type: String,
            required: true
        },
        buttonURL: {
            type: String,
            required: true
        },
        openInNewTab: Boolean
    },
    computed: {
        targetValue() {
            return this.openInNewTab ? "_blank" : "_self";
        }
    }
};
</script>