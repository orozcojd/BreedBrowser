import { FETCH_BREEDS } from './mutations.types'

export default {
  [FETCH_BREEDS] (state, breeds) {
    state.breeds = breeds
  }
}
