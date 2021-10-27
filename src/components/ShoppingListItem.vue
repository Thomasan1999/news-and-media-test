<template lang="pug">
div.shopping-list-item
    input.shopping-list-item-done(
        :checked="done"
        :title="`Označiť položku ako ${done ? 'nevybavenú' : 'vybavenú'}`"
        type="checkbox"
        @input="onInput('done', $event.target.checked)"
    )
    p.shopping-list-item-list-name(v-if="showListName") {{getListName(list)}}
    input.shopping-list-item-name(
        placeholder="Názov položky"
        type="text"
        :value="name"
        @input="onInput('name', $event.target.value)"
    )
    button.shopping-list-item-remove(title="Vymazať položku" type="button" @click="$emit('remove')") X
</template>

<script lang="ts">
import ShoppingListContainerMixin from '@/mixins/ShoppingListContainerMixin';
import Vue from 'vue';
import {mapState} from 'vuex';

export default Vue.extend({
    name: 'ShoppingListItem',
    mixins: [ShoppingListContainerMixin],
    props: {
        done: {
            required: true,
            type: Boolean
        },
        listId: {
            default: null,
            type: Number
        },
        name: {
            required: true,
            type: String
        },
        showListName: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        onInput(prop: string, value: any): void
        {
            this.$emit('input', prop, value);
        }
    },
    computed: {
        ...mapState(['lists']),
        list()
        {
            if (!this.listId)
            {
                return null;
            }

            return this.lists[this.listId];
        }
    }
});
</script>

<style lang="scss" scoped>
.shopping-list-item
{
    align-items: center;
    border-top: 1px solid var(--primary-border-color);
    display: grid;
    grid: 'a b c' 'a d c';
    grid-template-columns: auto 1fr auto;

    &:last-child
    {
        border-bottom: 1px solid var(--primary-border-color);
    }
}

.shopping-list-item-list-name
{
    color: #666666;
    font-size: .8em;
    font-style: italic;
    grid-area: b;
    padding-left: var(--input-padding-left);
}

.shopping-list-item-done
{
    grid-area: a;
    margin-right: 5px;
}

.shopping-list-item-remove
{
    background: transparent;
    border: 0;
    grid-area: c;
}

.shopping-list-item-name
{
    grid-area: d;
    flex-grow: 1;
}
</style>
