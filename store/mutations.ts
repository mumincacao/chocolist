import { getIndex, getItem, getList, hasItem, ListPayload } from "./helper";
import { Item, ItemListPayload, Store } from "./types";

type ItemPayload = {
  list: string
  label: string
}

type SetStatePayload = ItemPayload & {
  checked: boolean
}

type SetBulkStatusPayload = {
  list: string
  checked: boolean
  start: number
  end: number
}

type ReplaceListPayload = {
  list: string
  items: Array<Item>
}

export function addList(state: Store, { name }: ListPayload) {
  if (!name || hasItem(state.list, name)) {
    return
  }
  state.list.push({ name, list: [] })
}

export function removeList(state: Store, { name }: ListPayload) {
  const index = getIndex(state.list, name)
  if (index === -1) {
    return
  }
  state.list.splice(index, 1)
}

export function addItemList(state: Store, { list, items }: ItemListPayload) {
  const target = getList(state.list, list)
  if (target === undefined) {
    return
  }
  const newItems: Array<Item> = []
  items.map(name => {
    if (name && !hasItem(target.list, name)) {
      newItems.push({ name, checked: false })
    }
  })
  target.list.push(...newItems)
}

export function removeItem(state: Store, { list, label }: ItemPayload) {
  const target = getList(state.list, list)
  if (!target) {
    return
  }
  const index = getIndex(target.list, label)
  if (index === -1) {
    return
  }
  target.list.splice(index, 1)
}

export function clearItems(state: Store, { name }: ListPayload) {
  const target = getList(state.list, name)
  if (!target) {
    return
  }
  target.list.splice(0, target.list.length)
}

export function setState(state: Store, { list, label, checked }: SetStatePayload) {
  const item = getItem(state.list, list, label)
  if (item === undefined) {
    return
  }
  item.checked = checked
}

export function setBulkStatus(state: Store, { list, checked, start, end }: SetBulkStatusPayload) {
  const target = getList(state.list, list)
  if (target === undefined) {
    return
  }
  const items: Array<Item> = []
  target.list.slice(start, end).forEach(item => items.push({ name: item.name, checked }))
  target.list.splice(start, items.length, ...items)
}

export function replaceList(state: Store, { list, items }: ReplaceListPayload) {
  const target = getList(state.list, list)
  if (target === undefined) {
    addList(state, { name: list })
    replaceList(state, { list, items })
  } else {
    target.list.splice(0, target.list.length, ...items)
  }
}
