<template>
  <v-textarea v-model="input" label="追加したい項目を改行区切りで" clearable>
    <template #append-outer>
      <v-btn :loading="loading" @click="addItems">追加</v-btn>
    </template>
  </v-textarea>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  loading: boolean
  input: string | null
}

export default Vue.extend({
  props: {
    list: { type: String, required: true },
  },
  data(): Data {
    return {
      loading: false,
      input: null,
    }
  },
  methods: {
    async addItems(): Promise<void> {
      if (!this.input) {
        return
      }
      this.loading = true
      await this.$store.dispatch('addItems', {
        list: this.list,
        items: this.input.split(/\n/),
      })
      this.input = null
      this.loading = false
    },
  },
})
</script>
