<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="5">
        <v-card-title>いんぽーと</v-card-title>
        <v-card-text>
          <p>JSON 形式のふぁいるからでーたを読み込みます。</p>
          <p>
            でーたふぁいるの書式は<a href="/api/schema/chocolist.json"
              >JSON Schema</a
            >で定義されています。
          </p>
          <v-form>
            <v-radio-group v-model="type" label="読み込み形式" row>
              <v-radio
                v-for="t in importType"
                :key="t"
                :value="t"
                :label="t"
              ></v-radio>
            </v-radio-group>
            <v-file-input
              v-model="file"
              accept="text/json"
              label="ふぁいるを選択してください"
              show-size
            >
            </v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="upload">読み込む</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="5">
        <v-card-title>えくすぽーと</v-card-title>
        <v-card-text>
          <p>JSON 形式でだうんろーどします。</p>
          <p>
            TEXT
            形式や特定ぐるーぷのみが必要な時は対象ぐるーぷの一覧画面からできます。
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :href="url"
            :download="fileName"
            :loading="loading"
            @click="download"
            >だうんろーど</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Ajv from 'ajv'
import dateFormat from 'dateformat'
import Vue from 'vue'
import { CheckList } from '~/store/types'
const schema: object = require('@/static/api/schema/chocolist')

const TYPE = {
  merge: 'まーじ',
  replace: 'りぷれいす',
} as const
type IMPORT_TYPE = typeof TYPE[keyof typeof TYPE]

const DL_FILE_NAME = 'ちょこっとりすと'

type Data = {
  type: IMPORT_TYPE
  file: File | null
  url: string
  fileName: string
  loading: boolean
}

export default Vue.extend({
  name: 'DataManager',
  data(): Data {
    return {
      type: TYPE.merge,
      file: null,
      url: '#',
      fileName: '',
      loading: false,
    }
  },
  computed: {
    importType() {
      return TYPE
    },
  },
  methods: {
    async upload(): Promise<void> {
      if (!this.file) {
        return
      }
      this.loading = true
      const data: Array<CheckList> = JSON.parse(await this.file.text())
      const validate = new Ajv().compile(schema)
      if (!validate(data)) {
        this.loading = false
        return
      }
      const action = (this.type === TYPE.merge ? 'merge' : 'replace') + 'Import'
      await this.$store.dispatch(action, data)
      this.file = null
      this.loading = false
    },
    download() {
      this.loading = true
      this.fileName = DL_FILE_NAME + dateFormat('-yyyy-mm-dd.HHMMss') + '.json'
      this.url = URL.createObjectURL(
        new Blob([JSON.stringify(this.$store.state.list)], {
          type: 'text/json',
        })
      )
      this.loading = false
    },
  },
})
</script>
