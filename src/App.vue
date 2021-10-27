<template lang="pug">
div#app
    nav-component
    router-view.view(v-if="$store.state.initialized")
</template>

<script lang="ts">
import NavComponent from '@/components/NavComponent.vue';
import Vue from 'vue';

export default Vue.extend({
    components: {
        NavComponent
    },
    async created()
    {
        await this.$store.dispatch('init');
    }
});
</script>

<style lang="scss">
@import 'styles/reset.scss';
@import 'https://fonts.googleapis.com/css2?family=Roboto:wght&display=swap';

#app
{
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    height: 100vh;
    padding: 15px;
    width: 100%;

    --active-color: lightgreen;
    --input-padding-left: 5px;
    --line-height: 2rem;
    --primary-border-color: #000000;
}

.view
{
    align-items: center;
    display: flex;
    margin-top: 50px;
}

.view-content
{
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    width: 100%;
}

button
{
    cursor: pointer;
    font: inherit;
}

input, button, a
{
    line-height: var(--line-height);
    min-height: var(--line-height);
    transition: all .25s;

    &, &:focus, &:visited, &:active, &:focus-within, &:focus-visible, &:hover
    {
        color: inherit;
    }

    &:focus
    {
        outline: none;
    }
}

input
{
    box-sizing: border-box;
    padding-left: var(--input-padding-left);
}
</style>
