<template>
  <div class="container">
    <h3>Sub-breeds</h3>
    <ul>
      <li
        @click="$emit('sub-breed', breed)"
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
  }
}
</script>

<style scoped>
 .container {
   margin-top: 2em;
  }
  .container ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 0;
  }
  .container ul li {
    list-style-type: none;
    margin: 10px 10px;
    background:#CEDEEA;
    padding: .2em .5em;
    border-radius:.5em;
    cursor: pointer;
  }
  .container ul li:hover {
    background: #ffffff;
  }
</style>
