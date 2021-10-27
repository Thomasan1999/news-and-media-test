import {ShoppingListModel} from '@/types';
import Vue from 'vue';

/** Mixin for components which might contain a shopping list. */
export default Vue.extend({
    methods: {
        /** Used to display a placeholder name in case no name is defined. */
        getListName(list: ShoppingListModel): string
        {
            return list.name || `Zoznam ${list.id}`;
        }
    }
});
