<template>
  <v-form>
    <v-radio-group v-model="type" label="DL 形式" row>
      <v-radio
        v-for="label in typeList"
        :key="label"
        :label="label"
        :value="label"
      ></v-radio>
    </v-radio-group>
    <div class="text-right">
      <v-btn
        :href="url"
        :download="file"
        :loading="loading"
        @click="exportItems"
        >えくすぽーと</v-btn
      >
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import dateformat from 'dateformat'
import { Item } from '~/store/types'

const TYPE = {
  text: 'TEXT',
  json: 'JSON',
} as const
type EXPORT_TYPE = typeof TYPE[keyof typeof TYPE]

type Data = {
  type: EXPORT_TYPE
  url: string
  file: string
  loading: boolean
}

export default Vue.extend({
  props: {
    list: { type: Object, required: true },
  },
  data(): Data {
    return {
      type: TYPE.text,
      url: '#',
      file: '',
      loading: false,
    }
  },
  computed: {
    typeList(): object {
      return TYPE
    },
  },
  methods: {
    exportItems() {
      this.loading = true
      const data: Array<string> = []
      const options: { type: string } = { type: '' }
      this.file = this.list.name + dateformat('-yyyy-mm-dd.HHMMss.')
      if (this.type === TYPE.text) {
        this.file += 'txt'
        data.push(this.list.list.map((item: Item) => item.name).join('\n'))
        options.type = 'text/plain'
      } else {
        this.file += 'json'
        data.push(JSON.stringify(this.list))
        options.type = 'text/json'
      }
      this.url = URL.createObjectURL(new Blob(data, options))
      this.loading = false
    },
  },
})
</script>
