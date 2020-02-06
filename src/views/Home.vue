<template>
  <div>
    <div class="title">
      <h1>Breed Browser</h1>
    </div>
    <div class="container">
      <breed-card
        v-for="(arr, breed, i) in breeds"
        :key="i"
        :breed="breed"
        :sub-breeds="arr"
      >
      </breed-card>
    </div>
  </div>
</template>

<script>
import BreedCard from '@/components/BreedCard'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    BreedCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['breeds'])
  },
  mounted () {
    this.fetchBreeds()
  },
  methods: {
    ...mapActions(['fetchBreeds'])
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    padding: 2em;
    justify-content:center;
  }
  .title {
    margin-left: 1em;
  }

  @media all and (max-width: 743px) {
    .container {
      padding: .5em;
    }
  }
</style>
