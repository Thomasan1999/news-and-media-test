<template lang="pug">
div.shopping-list-controls
    button.shopping-list-controls-show-only-done-items(
        :class="{active: showOnlyDoneItems}"
        @click="toggleShowOnlyDoneItems"
    ) Ukázať iba vybavené položky
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ShoppingListControls',
    props: {
        showOnlyDoneItems: {
            required: true,
            type: Boolean
        }
    },
    methods: {
        toggleShowOnlyDoneItems(): void
        {
            this.$emit('toggleShowOnlyDoneItems');
        }
    }
});
</script>

<style lang="scss" scoped>
.shopping-list-controls
{
    margin-bottom: 20px;
}

.shopping-list-controls-show-only-done-items
{
    background: transparent;
    border: 1px solid var(--primary-border-color);

    &.active
    {
        background: var(--active-color);
    }
}
</style>
