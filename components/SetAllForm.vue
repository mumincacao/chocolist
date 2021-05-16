<template>
  <v-form>
    <v-radio-group v-model="status" label="操作内容" row>
      <v-radio
        v-for="label in statusList"
        :key="label"
        :label="label"
        :value="label"
      ></v-radio>
    </v-radio-group>
    <div class="text-right">
      <v-btn :loading="loading" @click="setAll">せっと</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

const STATUS = {
  on: 'すべてちぇっく',
  off: 'すべて解除',
  none: '変更しない',
} as const
type STATUS_TYPE = typeof STATUS[keyof typeof STATUS]

type Data = {
  loading: boolean
  status: STATUS_TYPE
}

export default Vue.extend({
  props: {
    list: { type: String, required: true },
  },
  data(): Data {
    return {
      loading: false,
      status: STATUS.none,
    }
  },
  computed: {
    statusList(): object {
      return STATUS
    },
  },
  methods: {
    async setAll(): Promise<void> {
      if (this.status === STATUS.none) {
        return
      }
      this.loading = true
      const checked = this.status === STATUS.on
      await this.$store.dispatch('setAll', { list: this.list, checked })
      this.loading = false
    },
  },
})
</script>
