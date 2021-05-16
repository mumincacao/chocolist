<template>
  <v-form>
    <v-text-field
      v-model="filter"
      label="絞り込み"
      clearable
      @change="updateFilterMethod"
    ></v-text-field>
    <v-radio-group v-model="status" label="すてーたす" row>
      <v-radio
        v-for="label in statusFilters"
        :key="label"
        :label="label"
        :value="label"
        @change="updateFilterMethod"
      ></v-radio>
    </v-radio-group>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Item } from '~/store/types'

const STATUS_FILTER = {
  on: '済',
  off: '未',
  all: 'ALL',
} as const
type FILTER_TYPE = typeof STATUS_FILTER[keyof typeof STATUS_FILTER]

type Data = {
  filter: string | null
  status: FILTER_TYPE
}

export default Vue.extend({
  data(): Data {
    return {
      filter: null,
      status: STATUS_FILTER.all,
    }
  },
  computed: {
    statusFilters(): object {
      return STATUS_FILTER
    },
  },
  methods: {
    updateFilterMethod(): void {
      this.$emit('updateFilterMethod', (item: Item) => {
        if (this.filter && !item.name.includes(this.filter)) {
          return false
        }
        if (this.status === STATUS_FILTER.on && !item.checked) {
          return false
        }
        if (this.status === STATUS_FILTER.off && item.checked) {
          return false
        }
        return true
      })
    },
  },
})
</script>
