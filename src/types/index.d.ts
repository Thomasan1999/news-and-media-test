export type ShoppingListItemModel = {
    done: boolean,
    id: number,
    listId: number,
    name: string,
    order: number
}

export type ShoppingListModel = {
    id: number,
    items: Record<number, ShoppingListItemModel>,
    name: string,
    order: number
}
