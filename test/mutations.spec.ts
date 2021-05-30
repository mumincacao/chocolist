import { getItem, getList, hasItem } from '~/store/helper'
import * as mutations from '~/store/mutations'
import { CheckList, Item, Store } from '~/store/types'

describe('mutations', () => {
  test('list', () => {
    const name = 'new-list'
    const list: Array<CheckList> = []
    const store: Store = { list }
    mutations.addList(store, { name: '' })
    expect(list.length).toEqual(0)
    mutations.addList(store, { name })
    expect(list.length).toEqual(1)
    expect(hasItem(list, name)).toBeTruthy()
    mutations.addList(store, { name })
    expect(store.list.length).toEqual(1)
    mutations.removeList(store, { name: 'unknown' })
    expect(store.list.length).toEqual(1)
    mutations.removeList(store, { name })
    expect(store.list.length).toEqual(0)
  })
  test('item', () => {
    const listName = 'item-list'
    const list: Array<Item> = []
    const store: Store = { list: [{ name: listName, list }] }
    mutations.addItemList(store, { list: 'unknown', items: ['item'] })
    expect(list.length).toEqual(0)
    mutations.addItemList(store, { list: listName, items: ['item-1', 'item-2', 'item-3', ''] })
    expect(list.length).toEqual(3)
    expect(hasItem(list, 'item-1')).toBeTruthy()
    expect(hasItem(list, 'item-2')).toBeTruthy()
    expect(hasItem(list, 'item-3')).toBeTruthy()
    expect(hasItem(list, 'unknown')).toBeFalsy()
    mutations.removeItem(store, { list: listName, label: 'unknown' })
    expect(list.length).toEqual(3)
    mutations.removeItem(store, { list: 'unknown', label: 'item-1' })
    expect(list.length).toEqual(3)
    mutations.removeItem(store, { list: listName, label: 'item-1' })
    expect(list.length).toEqual(2)
    mutations.clearItems(store, { name: 'unknown' })
    expect(list.length).toEqual(2)
    mutations.clearItems(store, { name: listName })
    expect(list.length).toEqual(0)
  })
  test('state', () => {
    const listName = 'item-list'
    const list: Array<CheckList> = [{ name: listName, list: [{ name: 'item-1', checked: false }, { name: 'item-2', checked: true }, { name: 'item-3', checked: false }] }]
    const store: Store = { list }
    mutations.setState(store, { list: 'unknown', label: 'item-1', checked: true })
    expect(getItem(list, listName, 'item-1')?.checked).toBeFalsy()
    mutations.setState(store, { list: listName, label: 'item-1', checked: true })
    expect(getItem(list, listName, 'item-1')?.checked).toBeTruthy()
    mutations.setBulkStatus(store, { list: 'unknown', checked: false, start: 1, end: 2 })
    expect(getItem(list, listName, 'item-1')?.checked).toBeTruthy()
    expect(getItem(list, listName, 'item-2')?.checked).toBeTruthy()
    expect(getItem(list, listName, 'item-3')?.checked).toBeFalsy()
    mutations.setBulkStatus(store, { list: listName, checked: false, start: 1, end: 2 })
    expect(getItem(list, listName, 'item-1')?.checked).toBeTruthy()
    expect(getItem(list, listName, 'item-2')?.checked).toBeFalsy()
    expect(getItem(list, listName, 'item-3')?.checked).toBeFalsy()
    mutations.setBulkStatus(store, { list: listName, checked: true, start: 0, end: 3 })
    expect(getItem(list, listName, 'item-1')?.checked).toBeTruthy()
    expect(getItem(list, listName, 'item-2')?.checked).toBeTruthy()
    expect(getItem(list, listName, 'item-3')?.checked).toBeTruthy()
  })
  test('replaceList', () => {
    const listName = 'item-list'
    const listA: Array<Item> = [{ name: 'item-1', checked: false }, { name: 'item-2', checked: true }, { name: 'item-2', checked: false }]
    const listB: Array<Item> = [{ name: 'item-A', checked: false }, { name: 'item-B', checked: true }]
    const store: Store = { list: [] }
    mutations.replaceList(store, { list: listName, items: listA })
    expect(getList(store.list, listName)?.list).toEqual(listA)
    mutations.replaceList(store, { list: 'other-list', items: listB })
    expect(getList(store.list, listName)?.list).toEqual(listA)
    expect(getList(store.list, 'other-list')?.list).toEqual(listB)
    mutations.replaceList(store, { list: listName, items: listB })
    expect(getList(store.list, listName)?.list).toEqual(listB)
  })
})
