export function updateItemProps(oldItem: { [k: string]: any }, newItem: { [k: string]: any }) {
    for (const k in newItem) {
        oldItem[k] = newItem[k]
    }
}
