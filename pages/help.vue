<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="$md.render(text)"></div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

const text = `
# ちょこっとりすとの使い方
## 基本的な使い方

1. \`ぐるーぷ管理\` で必要なぐるーぷを準備する
2. \`りすと\` で項目を追加したりちぇっくしたりしてみる
3. localStorage を制限してなければ自動的に保存されるはず

## 制限事項
- 入力された情報はさーばに保存したりしないので別ぶらうざや別端末と同期することができません
- 保存可能なでーた容量はぶらうざ依存でよくわかんないです
- localStorage を削除すると保存された情報が全部消えちゃいます

## なにかあったら
Twitter [@mumincacao](https://twitter.com/mumincacao) か [GitHub Issue](https://github.com/mumincacao/chocolist/issues) あたりまで。 必要そうで暇があれば対応するかもです。

`

export default Vue.extend({
  computed: {
    text: () => text,
  },
})
</script>
