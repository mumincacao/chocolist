import * as actions from "~/store/actions"
import { CheckList, Item, Store } from "~/store/types"

type Mutation = {
  type: string,
  payload?: object
}

const testAction = async (action: Function, payload: object, state: Store, expectedMutations: Array<Mutation>) => {
  let count = 0

  const commit = (type: string, payload: object) => {
    const mutation = expectedMutations[count]
    try {
      expect(type).toEqual(mutation.type)
      expect(payload).toEqual(mutation.payload)
    } catch (error) {
    }
    count++
  }
  await action({ commit, state }, payload)
  if (expectedMutations.length === 0) {
    expect(count).toEqual(0)
  }
}

const range = (max: number, callback?: (i: number) => any): Array<any> => {
  if (callback === undefined) {
    callback = i => 'item-' + (i + 1)
  }
  return [...Array(max).keys()].map(callback)
}

const makeItems = (max: number, prefix: string = 'item-'): Array<Item> => range(max, i => ({ name: prefix + (i + 1), checked: false }))

describe('actions', () => {
  test('addItems', async () => {
    const list = 'item-list'
    const store: Store = { list: [{ name: list, list: [] }] }
    const shortItems = range(5)
    const shortMutations: Array<Mutation> = [{ type: 'addItemList', payload: shortItems }]
    await testAction(actions.addItems, { list, items: shortItems }, store, shortMutations)
    const largeItems: Array<string> = range(110)
    const largeMutations: Array<Mutation> = [
      { type: 'addItemList', payload: largeItems.slice(0, 100) },
      { type: 'addItemList', payload: largeItems.slice(100, 110) },
    ]
    await testAction(actions.addItems, { list, items: largeItems }, store, largeMutations)
    await testAction(actions.addItems, { list: 'unknown', items: shortItems }, store, [])
  })
  test('setAll', async () => {
    const checked = true
    const shortList = 'short'
    const shortItems = makeItems(5)
    const shortMutations: Array<Mutation> = [{ type: 'setBulkStatus', payload: { list: shortList, checked, start: 0, end: 100 } }]
    const largeList = 'large'
    const largeItems = makeItems(110)
    const largeMutations: Array<Mutation> = [
      { type: 'setBulkStatus', payload: { list: largeList, checked, start: 0, end: 100 } },
      { type: 'setBulkStatus', payload: { list: largeList, checked, start: 100, end: 200 } },
    ]
    const store: Store = { list: [{ name: shortList, list: shortItems }, { name: largeList, list: largeItems }] }
    await testAction(actions.setAll, { list: shortList, checked }, store, shortMutations)
    await testAction(actions.setAll, { list: largeList, checked }, store, largeMutations)
    await testAction(actions.setAll, { list: 'unknown', checked }, store, [])
  })
  test('mergeImport', async () => {
    const listName = 'item-list'
    const sourceItems = makeItems(5)
    const newItems = makeItems(5, 'new-item-')
    const store: Store = { list: [{ name: listName, list: sourceItems.map(item => ({ name: item.name, checked: true })) }] }
    const data: Array<CheckList> = [{ name: 'unknown', list: newItems }, { name: listName, list: [...sourceItems, ...newItems] }]
    const mutations: Array<Mutation> = [
      { type: '', payload: { list: 'unknown', items: newItems } },
      { type: '', payload: { list: listName, items: [...sourceItems, ...newItems] } }
    ]
    await testAction(actions.mergeImport, data, store, mutations)
  })
  test('replaceImport', async () => {
    const listName = 'item-list'
    const sourceItems = makeItems(5)
    const newItems = makeItems(5, 'new-item-')
    const store: Store = { list: [{ name: listName, list: sourceItems }] }
    const data: Array<CheckList> = [{ name: 'unknown', list: newItems }, { name: listName, list: [...sourceItems, ...newItems] }]
    const mutations: Array<Mutation> = [
      { type: 'replaceList', payload: { list: 'unknown', items: newItems } },
      { type: 'replaceList', payload: { list: listName, items: [...sourceItems, ...newItems] } }
    ]
    await testAction(actions.replaceImport, data, store, mutations)
  })
})
