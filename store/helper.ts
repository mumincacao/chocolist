import { CheckList, Item, SearchableItem } from "./types";

export type ListPayload = SearchableItem;

export const getIndex = (list: Array<SearchableItem>, name: string): number => list.findIndex((list) => list.name === name);
export const hasItem = (list: Array<SearchableItem>, name: string): boolean => getIndex(list, name) !== -1;
export const getList = (list: Array<CheckList>, name: string): CheckList | undefined => list.find(list => list.name === name);
export const getItem = (list: Array<CheckList>, name: string, label: string): Item | undefined => getList(list, name)?.list.find(item => item.name === label);
