<template>
  <div>
    <div class="title">
      <h1>Breed Browser</h1>
    </div>
    <div class="container">
      <label for="breed-search">Search</label>
      <input
        v-model="breedComputed"
        type="search"
        name="breed-search"
        placeholder="Dog Breed..."
        id="breed-search"
      >
    </div>
    <div
      v-if="breeds.length && filterBreeds.length"
      key="filteredBreeds"
      class="container--flex"
    >
      <breed-card
        v-for="breed in filterBreeds"
        :key="breed.id"
        :breed="breed.type"
        :sub-breeds="breed.subBreeds"
      >
      </breed-card>
    </div>
    <div
    class="container"
      v-else-if="loaded && !filterBreeds.length"
      key="noResults"
    >
    <h1>Try refining your search...</h1>
    </div>
  </div>
</template>
<script async src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script>
import BreedCard from '@/components/BreedCard'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    BreedCard
  },
  data () {
    return {
      loaded: false,
      breedInfo: '',
      dbBreedInfo: ''
    }
  },
  computed: {
    ...mapState(['breeds']),
    filterBreeds () {
      if (this.breeds.length) {
        return this.breeds.filter(b =>
          b.type.includes(this.breedComputed.toLowerCase()) ||
          b.subBreeds.find(sb => sb.includes(this.breedComputed.toLowerCase()))
        )
      }
    },
    breedComputed: {
      get() {
        return this.breedInfo
      },
      set:_.debounce(function(val) {
        this.breedInfo = val
      }, 300)
    }
  },
  async mounted () {
    await this.fetchBreeds()
    this.loaded = true
  },
  methods: {
    ...mapActions(['fetchBreeds']),
  }
}
</script>

<style scoped>
  .container {
    padding: 2em;
  }
  input[type="search"] {
    padding:1em 1em;
    width: 300px;
    border: 2px solid#E7F1E9;
    font-size:.8em;
    border-radius:5px;
    margin-top: 1em;
  }
  .container--flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .title {
    margin-left: 1em;
  }

  @media all and (max-width: 743px) {
    .container {
      padding: .5em;
    }
  }
  @media all and (max-width: 300px) {
    h1 {
      font-size: 1em;
    }
    input[type="text"] {
      width: 90%;
    }
  }
</style>
