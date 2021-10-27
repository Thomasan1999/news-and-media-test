<template lang="pug">
div.search
    div.view-content
        input.search-input(
            placeholder="Hľadať"
            type="text"
            :value="searchQuery"
            @input="($event) => insertSearchQueryToUrl($event.target.value)"
        )
        shopping-list-item-container(
            :items="filteredItems"
            show-list-name
        )
            template(#empty)
                p(v-if="!searchQuery") Musíš zadať text do vyhľadávača, aby sa zobrazili položky.
</template>

<script lang="ts">
import ShoppingListItem from '@/components/ShoppingListItem.vue';
import ShoppingListItemContainer from '@/components/ShoppingListItemContainer.vue';
import {ShoppingListModel} from '@/types';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'Search',
    components: {
        ShoppingListItem,
        ShoppingListItemContainer
    },
    methods: {
        insertSearchQueryToUrl(value: string): void
        {
            const newQuery = value ? {q: value} : {};

            this.$router.replace({query: newQuery});
        },
        removeAccents(str: string): string
        {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
    },
    computed: {
        ...mapState(['lists']),
        filteredItems()
        {
            if (!this.searchQuery)
            {
                return [];
            }

            return Object.values(this.lists as Record<string, ShoppingListModel>).flatMap((list) => (
                Object.values(list.items).filter((item) =>
                {
                    const itemNameLowerCase = item.name.toLowerCase();
                    const itemNameLowerCaseNormalized = (this as any).removeAccents(item.name.toLowerCase());
                    const queryLowerCase = (this.searchQuery as string).toLowerCase();

                    // show items including á, ä if query includes a, but don't show items with a for query with á, ä
                    return (
                        itemNameLowerCase.includes(queryLowerCase)
                        || itemNameLowerCaseNormalized.includes(queryLowerCase)
                    );
                })
            ));
        },
        searchQuery(): string
        {
            if (!this.$route.query.q)
            {
                return '';
            }

            return this.$route.query.q.toString();
        }
    }
});
</script>

<style lang="scss" scoped>
.search
{
    align-items: center;
    display: flex;
    flex-direction: column;
}

.search-input
{
    border: 1px solid var(--primary-border-color);
    width: 100%;
}
</style>
