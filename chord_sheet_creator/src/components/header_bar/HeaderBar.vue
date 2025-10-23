<script setup lang="ts">
import NavBar from "./NavBar.vue";
import TitleBar from "./TitleBar.vue";
</script>

<template>
    <div id="header-bar"
        class="horizontal-layout
        spread-out
        primary-background
        large-horizontal-padding
        far-from-back-shadow">
        <TitleBar></TitleBar>
        <NavBar></NavBar>
    </div>
</template>
    
<script lang="ts">
export default {
    name: "header-bar"
};
</script>