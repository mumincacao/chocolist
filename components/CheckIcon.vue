<template>
  <v-icon>{{ icon }}</v-icon>
</template>

<script lang="ts">
import Vue from 'vue'

const DONE = 'mdi-checkbox-marked-circle-outline'
const STANDBY = 'mdi-checkbox-blank-circle-outline'

export default Vue.extend({
  props: {
    checked: Boolean,
  },
  computed: {
    icon(): string {
      return this.checked ? DONE : STANDBY
    },
  },
})
</script>
