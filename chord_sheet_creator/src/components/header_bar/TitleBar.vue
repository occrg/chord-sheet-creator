<template>
    <div id="title-bar" 
        class="horizontal-layout
        small-gap
        large-right-padding">
        <img src="/csc_logo.png" 
            alt="Chord Sheet Creator logo - three ovals placed vertically on top of each other"
            width="72"
            height="72"></img>
        <div id="title-text" 
            class="xxl-text 
            vertical-middle">
            Chord Sheet Creator</div>
    </div>
</template>
    
<script lang="ts">
export default {
    name: "title-bar"
};
</script>

<style scoped>
#title-bar {
    display: flex;
    gap: 0.5rem;
}
</style>