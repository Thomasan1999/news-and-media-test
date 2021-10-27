<template lang="pug">
div.nav-component
    div.nav-link-container
        router-link.nav-link(
            v-for="item in items"
            :key="item.id"
            :class="{active: $route.name === item.to.name}"
            draggable="false"
            :title="item.text"
            :to="item.to"
        ) {{item.text}}
</template>

<script lang="ts">
export default {
    name: 'NavComponent',
    data()
    {
        return {
            items: [
                {
                    id: 1,
                    text: 'Zobraziť nákupné zoznamy',
                    to: {name: 'ShoppingListContainer'}
                },
                {
                    id: 2,
                    text: 'Vyhľadať položky podľa názvu',
                    to: {name: 'Search'}
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.nav-component
{
    margin-bottom: 10px;
}

.nav-link-container
{
    align-items: center;
    display: flex;
    justify-content: center;
}

.nav-link
{
    border: 1px solid var(--primary-border-color);
    padding-left: 5px;
    padding-right: 5px;
    text-decoration: none;

    &:not(:last-child)
    {
        border-right: 0;
    }

    &.active
    {
        background-color: var(--active-color);
    }
}
</style>
