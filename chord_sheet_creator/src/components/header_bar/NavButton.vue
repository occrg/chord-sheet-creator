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
        buttonText: String,
        buttonURL: String,
        openInNewTab: Boolean
    },
    computed: {
        targetValue() {
            return this.openInNewTab ? "_blank" : "_self";
        }
    }
};
</script>