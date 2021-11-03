<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-text-field v-model="name" label="追加したいぐるーぷ" clearable>
        <template #append-outer>
          <v-btn elevation="2" @click="addList">追加</v-btn>
        </template>
      </v-text-field>
      <p v-if="groups.length === 0">登録されているぐるーぷがありません</p>
      <v-list v-else>
        <v-hover v-for="list in groups" v-slot="{ hover }" :key="list.name">
          <v-list-item :class="{ 'on-hover': hover }">
            <v-list-item-content>
              {{ list.name }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-dialog>
                <template #activator="{ on, attrs }">
                  <v-btn v-bind="attrs" fab v-on="on">
                    <v-icon> mdi-trash-can-outline </v-icon>
                  </v-btn>
                </template>
                <template #default="dialog">
                  <v-card>
                    <v-card-title>削除確認</v-card-title>
                    <v-card-text>"{{ list.name }}" を削除します</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="dialog.value = false"
                        >きゃんせる</v-btn
                      >
                      <v-btn
                        color="primary"
                        text
                        @click="
                          removeList({ name: list.name })
                          dialog.value = false
                        "
                        >削除</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list-item-icon>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

type Data = {
  name: string | null
}

export default Vue.extend({
  name: 'TabManager',
  data(): Data {
    return {
      name: null,
    }
  },
  computed: {
    groups() {
      return this.$store.state.list
    },
  },
  methods: {
    addList() {
      if (!this.name) {
        return
      }
      this.$store.commit('addList', { name: this.name })
      this.name = null
    },
    ...mapMutations(['removeList']),
  },
})
</script>
