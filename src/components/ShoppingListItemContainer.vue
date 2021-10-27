<template lang="pug">
div.shopping-list-item-container
    shopping-list-item(
        v-for="(item, itemId) in items"
        :key="itemId"
        :done="item.done"
        :list-id="item.listId"
        :name="item.name"
        :show-list-name="showListName"
        @input="(prop, value) => onItemInput(item, prop, value)"
        @remove="removeItem(item)"
    )
    slot(v-if="!items.length" name="empty")
</template>

<script lang="ts">
import ShoppingListItem from '@/components/ShoppingListItem.vue';
import {ShoppingListItemModel, ShoppingListModel} from '@/types';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'ShoppingListItemContainer',
    components: {
        ShoppingListItem
    },
    props: {
        emptyText: {
            type: String
        },
        items: {
            required: true,
            type: Array
        },
        showListName: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        getItemList(item: ShoppingListItemModel): ShoppingListModel
        {
            return this.lists[item.listId];
        },
        async onItemInput(item: ShoppingListItemModel, prop: string, value: string): Promise<void>
        {
            await this.$store.dispatch(
                'updateItem',
                {item, list: this.getItemList(item), prop, value}
            );
        },
        async removeItem(item: ShoppingListItemModel): Promise<void>
        {
            await this.$store.dispatch('removeItem', {item, list: this.getItemList(item)});
        }
    },
    computed: {
        ...mapState(['lists'])
    }
});
</script>

<style lang="scss" scoped>
.shopping-list-item-container
{
    border: 2px solid var(--primary-border-color);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 500px;
    overflow: auto;
}
</style>
