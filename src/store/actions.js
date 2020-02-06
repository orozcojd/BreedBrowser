import { FETCH_BREEDS } from './actions.types'
import { ApiService } from '@/common/api.service'

export default {
  async fetchBreeds ({ commit }) {
    try {
      const { data } = await ApiService().get('/breeds/list/all')
      commit(FETCH_BREEDS, data.message)
    } catch (e) {
      console.log(e)
    }
    // console.log(breeds)
  }
}
