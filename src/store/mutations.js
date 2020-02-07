import { FETCH_BREEDS } from './mutations.types'

export default {
  [FETCH_BREEDS] (state, breeds) {
    state.breeds = Object.entries(breeds).map((b, i) => ({
      type: b[0],
      subBreeds: b[1],
      id: i
    }))
  }
}
