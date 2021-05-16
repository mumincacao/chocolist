<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <empty-list v-if="groups.length === 0"></empty-list>
      <template v-else>
        <v-tabs v-model="tab" center-active show-arrows>
          <v-tab v-for="(list, index) in groups" :key="index">
            <v-badge :content="list.list.length + ''">
              {{ list.name }}
            </v-badge>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(list, index) in groups" :key="index">
            <v-tabs v-model="control" center-active show-arrows>
              <v-tab
                v-for="label in controlLabels"
                :key="label"
                :href="`#${label}`"
                >{{ label }}</v-tab
              >
            </v-tabs>
            <v-tabs-items v-model="control">
              <v-tab-item :value="controlLabels.filter">
                <item-filter-form
                  @updateFilterMethod="updateFilterMethod"
                ></item-filter-form>
              </v-tab-item>
              <v-tab-item :value="controlLabels.input">
                <add-items :list="list.name"></add-items>
              </v-tab-item>
              <v-tab-item :value="controlLabels.bulk">
                <set-all-form :list="list.name"></set-all-form>
              </v-tab-item>
              <v-tab-item :value="controlLabels.export">
                <export-items :list="list"></export-items>
              </v-tab-item>
              <v-tab-item :value="controlLabels.clear">
                <clear-items
                  v-model="enableDelete"
                  :list="list.name"
                ></clear-items>
              </v-tab-item>
            </v-tabs-items>
            <hr />
            <v-virtual-scroll
              :items="filterList(list.list)"
              item-height="50"
              max-height="600"
              bench="2"
            >
              <template #default="{ item }">
                <v-hover v-slot="{ hover }">
                  <v-list-item
                    :class="{ 'on-hover': hover }"
                    @click="
                      setState({
                        list: list.name,
                        label: item.name,
                        checked: !item.checked,
                      })
                    "
                  >
                    <v-list-item-icon>
                      <check-icon :checked="item.checked"></check-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      {{ item.name }}
                    </v-list-item-content>
                    <v-list-item-icon v-if="enableDelete">
                      <v-icon
                        @click.stop="
                          removeItem({ list: list.name, label: item.name })
                        "
                      >
                        mdi-trash-can-outline
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-hover>
              </template>
            </v-virtual-scroll>
          </v-tab-item>
        </v-tabs-items>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import AddItems from '~/components/AddItems.vue'
import CheckIcon from '~/components/CheckIcon.vue'
import ClearItems from '~/components/ClearItems.vue'
import EmptyList from '~/components/EmptyList.vue'
import ExportItems from '~/components/ExportItems.vue'
import ItemFilterForm from '~/components/ItemFilterForm.vue'
import SetAllForm from '~/components/SetAllForm.vue'
import { CheckList, Item } from '~/store/types'

const CONTROL = {
  filter: '絞り込み',
  input: '項目追加',
  bulk: 'まとめて操作',
  export: 'えくすぽーと',
  clear: '削除',
} as const
type Control = typeof CONTROL[keyof typeof CONTROL]

type FilterMethod = { (item: Item): boolean }

type Data = {
  tab: number | null
  control: Control
  filter: FilterMethod | null
  enableDelete: boolean
}

export default Vue.extend({
  components: {
    AddItems,
    CheckIcon,
    ClearItems,
    ExportItems,
    ItemFilterForm,
    SetAllForm,
    EmptyList,
  },
  data(): Data {
    return {
      tab: null,
      control: CONTROL.filter,
      filter: null,
      enableDelete: false,
    }
  },
  computed: {
    controlLabels(): object {
      return CONTROL
    },
    groups(): Array<CheckList> {
      return this.$store.state.list
    },
  },
  methods: {
    updateFilterMethod(filter: FilterMethod): void {
      this.filter = filter
    },
    filterList(list: Array<Item>): Array<Item> {
      if (!this.filter) {
        return list
      }
      return list.filter(this.filter)
    },
    ...mapMutations(['setState', 'removeItem']),
  },
})
</script>
