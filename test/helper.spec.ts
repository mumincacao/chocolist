import * as helper from '@/store/helper'
import { CheckList } from '~/store/types'

const list: Array<CheckList> = [
  { name: '1st', list: [{ name: 'item-1-1', checked: true }] },
  { name: '2nd', list: [{ name: 'item-2-1', checked: false }, { name: 'item-2-2', checked: true }] },
  { name: '3rd', list: [{ name: 'item-3-1', checked: true }, { name: 'item-3-1', checked: true }, { name: 'item-3-1', checked: true }] },
]

describe('helper', () => {
  test('getIndex', () => {
    expect(helper.getIndex(list, '1st')).toEqual(0)
    expect(helper.getIndex(list, '2nd')).toEqual(1)
    expect(helper.getIndex(list, '3rd')).toEqual(2)
  })
  test('hasItem', () => {
    expect(helper.hasItem(list, '1st')).toBeTruthy()
    expect(helper.hasItem(list, 'unknown')).toBeFalsy()
  })
  test('getList', () => {
    expect(helper.getList(list, '1st')?.name).toEqual('1st')
    expect(helper.getList(list, '2nd')?.name).toEqual('2nd')
    expect(helper.getList(list, '3rd')?.name).toEqual('3rd')
    expect(helper.getList(list, 'unknown')).toBeUndefined()
  })
  test('getItem', () => {
    expect(helper.getItem(list, '1st', 'item-1-1')?.name).toEqual('item-1-1')
    expect(helper.getItem(list, '2nd', 'item-2-2')?.name).toEqual('item-2-2')
    expect(helper.getItem(list, '2nd', 'item-2-2')?.name).toEqual('item-2-2')
    expect(helper.getItem(list, 'unknown', 'item-1-1')).toBeUndefined()
    expect(helper.getItem(list, '1st', 'unknown')).toBeUndefined()
  })
})
