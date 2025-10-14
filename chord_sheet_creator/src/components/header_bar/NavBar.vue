<script setup lang="ts">
import NavButton from "./NavButton.vue";
</script>

<template>
    <div id="nav-bar"
        class="horizontal-layout
        small-gap">
        <NavButton 
            buttonText="Contact"
            buttonURL="mailto:occrg@outlook.com"
            openInNewTab>
        </NavButton>
        <NavButton 
            buttonText="Donate"
            buttonURL="https://ko-fi.com/occrg"
            openInNewTab>
        </NavButton>
    </div>
</template>
    
<script lang="ts">
export default {
    name: "nav-bar"
};
</script>