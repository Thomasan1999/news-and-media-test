<template lang="pug">
button.shopping-list-tab-remove(title="Vymazať zoznam" @click="$emit('remove', list)") X
</template>

<script lang="ts">
export default {
    name: 'ShoppingListTabRemove',
    props: {
        list: {
            required: true,
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped>
.shopping-list-tab-remove
{
    background: transparent;
    border: 0;
}
</style>
