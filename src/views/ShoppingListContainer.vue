<template lang="pug">
div.shopping-list-container
    div.view-content
        shopping-list-controls(
            :show-only-done-items="showOnlyDoneItems"
            @toggleShowOnlyDoneItems="toggleShowOnlyDoneItems"
        )
        shopping-list-tabs(:active-list="activeList" :other-lists="inactiveLists" @add="addList" @remove="removeList")
        shopping-list(:id="activeListId" :show-only-done-items="showOnlyDoneItems" @remove="removeList")
</template>

<script lang="ts">
import ShoppingList from '@/components/ShoppingList.vue';
import Vue from 'vue';
import ShoppingListControls from '@/components/ShoppingListControls.vue';
import ShoppingListTabs from '@/components/ShoppingListTabs.vue';
import {mapState} from 'vuex';
import {ShoppingListItemModel, ShoppingListModel} from '@/types';

export default Vue.extend({
    name: 'ShoppingListContainer',
    components: {
        ShoppingList,
        ShoppingListTabs,
        ShoppingListControls
    },
    methods: {
        async addList(): Promise<void>
        {
            const addedList = await this.$store.dispatch('addList');

            await this.$router.push({params: {id: addedList.id}});
        },
        async removeList(listToRemove: ShoppingListModel): Promise<void>
        {
            const nonRemovedLists = Object.values(this.lists as Record<string, ShoppingListModel>).filter((list) => (
                listToRemove.id !== list.id
            ));

            const nextList = nonRemovedLists[0];

            const activeListNotChanged = nextList !== this.activeList;

            if (activeListNotChanged)
            {
                await this.$router.push({params: {id: nextList.id.toString()}});
            }

            await this.$store.dispatch('removeList', {list: listToRemove});
        },
        toggleShowOnlyDoneItems(): void
        {
            const newQuery = this.showOnlyDoneItems ? {} : {showOnlyDoneItems: 'true'};

            this.$router.push({query: newQuery});
        }
    },
    computed: {
        ...mapState(['lists']),
        activeList(): ShoppingListModel
        {
            return this.lists[this.activeListId];
        },
        activeListId(): number
        {
            return this.$route.params.id ? parseInt(this.$route.params.id) : parseInt(Object.keys(this.lists)[0]);
        },
        inactiveLists(): ShoppingListModel[]
        {
            return Object.values(this.lists as Record<string, ShoppingListModel>).filter((list) => (
                list.id !== this.activeList.id
            ));
        },
        showOnlyDoneItems(): boolean
        {
            return Boolean(this.$route.query.showOnlyDoneItems);
        }
    }
});
</script>

<style lang="scss" scoped>
.shopping-list-container
{
    display: flex;
    flex-direction: column;
    line-height: var(--line-height);
    justify-content: center;
    margin: auto;
}
</style>
