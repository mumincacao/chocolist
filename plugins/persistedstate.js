import createState from 'vuex-persistedstate'

const key = 'chocolist'
export default ({ store }) => {
  createState({ key })(store)
}
