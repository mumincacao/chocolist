import { CheckList, Store } from "./types"
export * from './mutations';
export * from './actions';

export const state = (): Store => ({
  list: Array<CheckList>()
})
