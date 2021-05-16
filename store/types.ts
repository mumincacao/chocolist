export type SearchableItem = {
  name: string;
}

export type Item = SearchableItem & {
  checked: boolean;
}

export type ItemListPayload = {
  list: string;
  items: Array<string>;
}

export type CheckList = SearchableItem & {
  list: Array<Item>;
}

export type Store = {
  list: Array<CheckList>;
}
