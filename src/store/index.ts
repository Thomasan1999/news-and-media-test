import {ShoppingListItemModel, ShoppingListModel} from '@/types';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemAttributes: ['done', 'name'],
        initialized: false,
        lists: {} as Record<number, ShoppingListModel>
    },
    mutations: {
        addItem(state, {item, list}: {item: ShoppingListItemModel, list: ShoppingListModel}): void
        {
            Vue.set(list.items, item.id, item);
        },
        addList(state, list: ShoppingListModel): void
        {
            Vue.set(state.lists, list.id, list);
        },
        loadStoredLists(state, lists: Record<string, ShoppingListModel>): void
        {
            state.lists = lists;
        },
        removeItem(state, {item, list}: {item: ShoppingListItemModel, list: ShoppingListModel}): void
        {
            Vue.delete(list.items, item.id);
        },
        removeList(state, {list}: {list: ShoppingListModel}): void
        {
            Vue.delete(state.lists, list.id);
        },
        set(state, {prop, value}): void
        {
            state[prop] = value;
        },
        updateItem(state, {item, prop, value}): void
        {
            item[prop] = value;
        },
        updateList(state, {list, prop, value}): void
        {
            list[prop] = value;
        }
    },
    actions: {
        async addItem({commit, dispatch}, {list}: {list: ShoppingListModel}): Promise<void>
        {
            const item: Partial<ShoppingListItemModel> = {};

            const listStorageKey = await dispatch('getListStorageKey', {list});

            const idCounterKey = `${listStorageKey}.idCounter`;

            const idCounter = await dispatch('getStoredIdCounter', idCounterKey);

            await dispatch('incrementStoredIdCounter', idCounterKey);

            const itemId = idCounter + 1;

            Vue.set(item, 'done', false);
            Vue.set(item, 'id', itemId);
            Vue.set(item, 'listId', list.id);
            Vue.set(item, 'name', '');

            commit('addItem', {item, list});

            await dispatch('storeItem', {item, list});
        },
        async addList({commit, dispatch}): Promise<ShoppingListModel>
        {
            const list: Partial<ShoppingListModel> = {};

            const idCounterKey = 'listsIdCounter';

            const idCounter = await dispatch('getStoredIdCounter', idCounterKey);

            await dispatch('incrementStoredIdCounter', idCounterKey);

            const itemId = idCounter + 1;

            Vue.set(list, 'id', itemId);
            Vue.set(list, 'items', {});
            Vue.set(list, 'name', '');

            commit('addList', list);

            const listStorageKey = await dispatch('getListStorageKey', {list});

            localStorage.setItem(`${listStorageKey}.name`, list.name!);

            return list as ShoppingListModel;
        },
        async createListOnEmptyLists({dispatch, state}): Promise<void>
        {
            const listsAreEmpty = !Object.keys(state.lists).length;

            if (listsAreEmpty)
            {
                await dispatch('addList');
            }
        },
        async getItemStorageKey({dispatch}, {item, list}): Promise<string>
        {
            const listStorageKey = await dispatch('getListStorageKey', {list});

            return `${listStorageKey}.items.${item.id}`;
        },
        async getListStorageKey({}, {list}): Promise<string>
        {
            return `lists.${list.id}`;
        },
        async getStoredIdCounter({}, idCounterKey: string): Promise<number>
        {
            const idCounterString = localStorage.getItem(idCounterKey) ?? '0';

            return parseInt(idCounterString);
        },
        async incrementStoredIdCounter({dispatch}, idCounterKey: string): Promise<void>
        {
            const idCounter = await dispatch('getStoredIdCounter', idCounterKey);

            localStorage.setItem(idCounterKey, idCounter + 1);
        },
        async init({commit, dispatch, state}): Promise<void>
        {
            if (state.initialized)
            {
                throw new Error('Store has been already initialized');
            }

            await dispatch('loadStoredLists');
            await dispatch('createListOnEmptyLists');

            commit('set', {prop: 'initialized', value: true});
        },
        async loadStoredLists({commit}): Promise<void>
        {
            const listsStorageKeys = Object.keys(localStorage).filter((localStorageKey) => (
                localStorageKey.startsWith('lists.')
            ));

            const lists = {};

            for await (const localStorageKey of listsStorageKeys)
            {
                const [, listId, propertyName, itemId, itemProperty] = localStorageKey.split('.');
                const propertyValue = localStorage.getItem(localStorageKey)!;

                const listExists = Boolean(lists[listId]);

                if (!listExists)
                {
                    Vue.set(lists, listId, {});
                    Vue.set(lists[listId], 'id', parseInt(listId));
                    Vue.set(lists[listId], 'items', {});
                }

                switch (propertyName)
                {
                    case 'name':
                    {
                        Vue.set(lists[listId], 'name', propertyValue);
                        break;
                    }
                    case 'items':
                    {
                        const itemPropertyValue: any = JSON.parse(propertyValue);

                        const {items} = lists[listId];

                        const itemExists = Boolean(items[itemId]);

                        if (!itemExists)
                        {
                            Vue.set(items, itemId, {});
                            Vue.set(items[itemId], 'id', parseInt(itemId));
                            Vue.set(items[itemId], 'listId', parseInt(listId));
                        }

                        Vue.set(items[itemId], itemProperty, itemPropertyValue);
                    }
                }
            }

            await commit('loadStoredLists', lists);
        },
        async removeItem(
            {commit, dispatch, state},
            {item, list}: {item: ShoppingListItemModel, list: ShoppingListModel}
        ): Promise<void>
        {
            commit('removeItem', {item, list});

            const itemStorageKey = await dispatch('getItemStorageKey', {item, list});

            state.itemAttributes.forEach((prop) =>
            {
                localStorage.removeItem(`${itemStorageKey}.${prop}`);
            });
        },
        async removeList(
            {commit, dispatch},
            {list}: {list: ShoppingListModel}
        ): Promise<void>
        {
            commit('removeList', {list});

            const listStoragePrefix = await dispatch('getListStorageKey', {list});

            const listStorageKeys = Object.keys(localStorage).filter((localStorageKey) => (
                localStorageKey.startsWith(listStoragePrefix)
            ));

            listStorageKeys.forEach((listStorageKey) =>
            {
                localStorage.removeItem(listStorageKey);
            });
        },
        async storeItem({dispatch, state}, {item, list}): Promise<void>
        {
            const promises = Promise.all(
                state.itemAttributes.map((prop) => dispatch('storeItemProperty', {item, list, prop}))
            );

            await promises;
        },
        async storeItemProperty({dispatch}, {item, list, prop}): Promise<void>
        {
            const itemStorageKey = await dispatch('getItemStorageKey', {item, list});

            const stringifiedItemValue = JSON.stringify(item[prop]);

            localStorage.setItem(`${itemStorageKey}.${prop}`, stringifiedItemValue);
        },
        async storeListProperty({dispatch}, {list, prop}): Promise<void>
        {
            const listStorageKey = await dispatch('getListStorageKey', {list, prop});

            const listPropStorageKey = `${listStorageKey}.${prop}`;

            localStorage.setItem(listPropStorageKey, list[prop]);
        },
        async updateItem(
            {commit, dispatch},
            {item, list, prop, value}: {item: ShoppingListItemModel, list: ShoppingListModel, prop: string, value: any}
        ): Promise<void>
        {
            commit('updateItem', {item, prop, value});

            await dispatch('storeItemProperty', {item, list, prop});
        },
        async updateList(
            {commit, dispatch},
            {list, prop, value}: {list: ShoppingListModel, prop: string, value: any}
        ): Promise<void>
        {
            commit('updateList', {list, prop, value});

            await dispatch('storeListProperty', {list, prop});
        }
    }
});
