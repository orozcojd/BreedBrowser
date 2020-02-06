<template>
  <div class="container">
    <h3>Sub Breeds</h3>
    <ul>
      <li
        v-for="(breed, i) in subBreeds"
        :key="i"
      >
      {{ breed }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreedCardDetails',
  props: {
    subBreeds: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
 .container {
   margin-top: 2em;
  }
  .container ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
  }
  .container ul li {
    list-style-type: none;
    margin: 10px 10px;
    flex-grow: 1;
  }
</style>
