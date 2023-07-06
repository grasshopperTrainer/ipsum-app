export function updateItemProps(oldItem: { [k: string]: any }, newItem: { [k: string]: any }) {
    for (const k in newItem) {
        oldItem[k] = newItem[k]
    }
}

export function removeFromArray(fromArray: any[], item: any, comparator: Function) {
    let idx
    fromArray.forEach((x, i) => {
        if (comparator(x, item)) idx = i
    })
    if (idx != null) return fromArray.splice(idx, 1)[0]
}