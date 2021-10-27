<template lang="pug">
div.shopping-list-tabs
    div.shopping-list-tab-container
        div.shopping-list-tab.active
            input(
                placeholder="Názov zoznamu"
                type="text"
                :value="activeList.name"
                @input="onListNameInput($event.target.value)"
            )
            shopping-list-tab-remove(v-if="inactiveLists.length" :list="activeList" @remove="onListRemove")
        div.shopping-list-tab(
            v-for="list in inactiveLists"
            :key="list.id"
        )
            router-link.shopping-list-tab-link(
                :title="`Zobraziť ${getListName(list)}`"
                :to="{params: {id: list.id}}"
            ) {{getListName(list)}}
            shopping-list-tab-remove(:list="list" @remove="onListRemove")
    button.shopping-list-tab-add(@click="$emit('add')") Pridať zoznam
</template>

<script lang="ts">
import ShoppingListTabRemove from '@/components/ShoppingListTabRemove.vue';
import ShoppingListContainerMixin from '@/mixins/ShoppingListContainerMixin';
import {ShoppingListModel} from '@/types';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'ShoppingListTabs',
    components: {
        ShoppingListTabRemove
    },
    mixins: [ShoppingListContainerMixin],
    props: {
        activeList: {
            required: true,
            type: Object
        }
    },
    methods: {
        async onListNameInput(newName: string): Promise<void>
        {
            await this.$store.dispatch(
                'updateList',
                {list: this.activeList, prop: 'name', value: newName}
            );
        },
        onListRemove(list: ShoppingListModel): void
        {
            this.$emit('remove', list);
        }
    },
    computed: {
        ...mapState(['lists']),
        inactiveLists(): ShoppingListModel[]
        {
            return Object.values(this.lists as Record<string, ShoppingListModel>).filter((list) => (
                list.id !== this.activeList.id
            ));
        }
    }
});
</script>

<style lang="scss" scoped>
.shopping-list-tabs
{
    display: flex;
}

.shopping-list-tab-container
{
    display: flex;
    flex-grow: 1;
    overflow: auto;
}

.shopping-list-tab
{
    border-right: 1px solid var(--primary-border-color);
    display: flex;
    flex: 0 0 200px;
}

.shopping-list-tab-link
{
    flex-grow: 1;
    text-decoration: none;
}

.shopping-list-tab-add
{
    flex: 0 0 120px;
}
</style>
