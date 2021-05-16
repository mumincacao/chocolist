import { getIndex, getItem, getList, hasItem } from "./helper";
import { CheckList, Item, ItemListPayload, Store } from "./types";

type SetAllPayload = {
  list: string
  checked: boolean
}

type Commit = (name: string, payload: object | undefined) => void
type Dispatch = (name: string, payload: object | undefined) => Promise<void>
type Context = {
  state: Store,
  commit: Commit
  dispatch: Dispatch
}

const sleep = async (msec: number) => new Promise(resolve => setTimeout(resolve, msec))

const chunk = function* <T>(list: Array<T>, size: number) {
  for (let i = 0; i <= list.length; i += size) {
    const result = list.slice(i, i + size)
    if (result !== undefined) {
      yield result
    }
  }
}

const CHUNK_SIZE = 100
const SLEEP_TIME = 100

export async function addItems({ state, commit }: Context, { list, items }: ItemListPayload) {
  if (!hasItem(state.list, list)) {
    return
  }
  sleep(0)
  const generator = chunk(items, CHUNK_SIZE)
  for (const chunk of generator) {
    commit('addItemList', { list, items: chunk })
    await sleep(SLEEP_TIME)
  }
}

export async function setAll({ state, commit }: Context, { list, checked }: SetAllPayload) {
  const source = getList(state.list, list)
  if (!source) {
    return
  }
  sleep(0)
  const length = source.list.length
  for (let i = 0; i <= length; i += CHUNK_SIZE) {
    commit('setBulkStatus', { list, checked, start: i, end: i + CHUNK_SIZE })
    await sleep(SLEEP_TIME)
  }
}

export async function mergeImport({ state, commit, dispatch }: Context, data: Array<CheckList>) {
  for (const list of data) {
    await sleep(0)
    const source = getList(state.list, list.name)
    if (!source) {
      commit('replaceList', { list: list.name, items: list.list })
    } else {
      const newList: Array<Item> = JSON.parse(JSON.stringify(source.list))
      for (const item of list.list) {
        const index = getIndex(newList, item.name)
        if (index !== -1) {
          newList[index].checked = item.checked
        } else {
          newList.push(item)
        }
      }
      commit('replaceList', { list: list.name, items: newList })
    }
  }
}

export async function replaceImport({ commit }: Context, data: Array<CheckList>) {
  for (const list of data) {
    await sleep(0)
    commit('replaceList', { list: list.name, items: list.list })
  }
}
