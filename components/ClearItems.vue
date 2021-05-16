<template>
  <v-form>
    <v-switch :value="enableDelete" @change="setEnableDelete">
      <template #label>個別削除</template>
    </v-switch>
    <v-text-field
      v-model="confirm"
      :label="`誤爆防止のために『${resetWord}』と入力してください`"
      clearable
    >
      <template #append-outer>
        <v-btn elevation="2" @click="clearItems">全削除</v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

const RESET_WORD = 'をりせっと'

type Data = {
  confirm: string | null
}

export default Vue.extend({
  props: {
    list: { type: String, required: true },
    enableDelete: Boolean,
  },
  data(): Data {
    return {
      confirm: null,
    }
  },
  computed: {
    resetWord(): string {
      return this.list + RESET_WORD
    },
  },
  methods: {
    setEnableDelete(value: boolean): void {
      this.$emit('input', value)
    },
    clearItems(): void {
      if (this.confirm === this.resetWord) {
        this.$store.commit('clearItems', { name: this.list })
      }
      this.confirm = null
    },
  },
})
</script>
