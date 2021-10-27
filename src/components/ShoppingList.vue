<template lang="pug">
div.shopping-list
    shopping-list-item-container(:items="items")
        template(#empty)
            p Tu sa zobrazia {{showOnlyDoneItems ? 'vybavené' : 'pridané'}} položky.
    button(v-if="!showOnlyDoneItems" type="button" @click="addItem") Pridať položku
</template>

<script lang="ts">
import ShoppingListItem from '@/components/ShoppingListItem.vue';
import ShoppingListItemContainer from '@/components/ShoppingListItemContainer.vue';
import {ShoppingListItemModel, ShoppingListModel} from '@/types';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    components: {
        ShoppingListItem,
        ShoppingListItemContainer
    },
    props: {
        id: {
            required: true,
            type: Number
        },
        showOnlyDoneItems: {
            required: true,
            type: Boolean
        }
    },
    methods: {
        async addItem(): Promise<void>
        {
            await this.$store.dispatch('addItem', {list: this.list});
        }
    },
    computed: {
        ...mapState(['lists']),
        items(): ShoppingListItemModel[]
        {
            return Object.values(this.list.items).filter((item) =>
            {
                if (this.showOnlyDoneItems)
                {
                    return item.done;
                }

                return true;
            });
        },
        list(): ShoppingListModel
        {
            return this.lists[this.id];
        }
    }
});
</script>

<style lang="scss" scoped>
.shopping-list
{
    display: flex;
    flex-direction: column;
    width: 100%;
}

.shopping-list-name
{
    margin-bottom: 15px;
    margin-top: 15px;
}
</style>
