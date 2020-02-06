<template>
  <div class="breed-card">
    <transition name="overlay">
      <div
        v-if="!img.length"
        class="overlay"
        :style="loadingColor"
      />
    </transition>
    <div
      @click="newImg()"
      class="breed-img"
    >
      <img
        :src="img"
        alt="breed-img"
        loading="lazy"
      >
    </div>
    <div class="breed-card__description">
      <h2>{{ breed }}</h2>
      <div v-if="subBreeds.length">
        <div
          class="breed-card--expand"
          @click="expandCard = !expandCard"
        >
          <img
            v-if="!expandCard"
            key="expand"
            src="@/assets/expand_more-24px.svg"
            alt="more"
          >
          <img
            v-else
            key="hide"
            src="@/assets/expand_less-24px.svg" alt="more">
        </div>
        <breed-card-details
          :subBreeds="subBreeds"
          v-if="expandCard"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ApiService } from '@/common/api.service'
import BreedCardDetails from '@/components/BreedCardDetails'
export default {
  name: 'BreedInfoCard',
  components: {
    BreedCardDetails
  },
  props: {
    breed: {
      type: String,
      required: true
    },
    subBreeds: {
      type: Array,
      required: true
    }
  },
  computed: {
    loadingColor () {
      return {
        background: `#${this.newColor()}`,
        zIndex: 2,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }
    },
    expandImg () {
      return this.expandCard ? this.arrowDown : this.arrowUp
    }
  },
  data () {
    return {
      img: '',
      loading: true,
      expandCard: false
    }
  },
  async mounted () {
    await this.fetchBreedImg()
    this.loading = false
  },
  methods: {
    async fetchBreedImg () {
      const { data } = await ApiService().get(`/breed/${this.breed}/images/random`)
      this.img = data.message
    },
    newImg () {
      this.fetchBreedImg()
    },
    newColor () {
      return Math.floor(Math.random() * 9999999).toString(16)
    }
  }
}
</script>

<style scoped>
  .breed-card {
    position: relative;
    text-align: center;
    justify-content: start;
    background:#E7F1E9;
    width: 300px;
    margin:1em;
    word-break: break-all;
  }
  .breed-card__description {
    padding: 0 2em 2em 2em;
  }
  .breed-card--expand {
    margin: auto;
    background: #CEDEEA;
    border-radius: 100%;
    width: 24px;
    opacity: .8;
    cursor: pointer;
  }
  .breed-card--expand:hover {
    background: #ffffff;
  }
  .breed-card--expand img {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .expand {
    cursor: pointer;
  }
  .breed-img {
    height: 200px;
  }
  .breed-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .7;
  }
  .breed-img img:hover {
    cursor: pointer;
    opacity: 1;
  }
  .overlay-enter-active, .overlay-leave-active {
    transition: opacity 1s;
  }
  .overlay-enter, .overlay-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @media all and (max-width: 600px) {
    .breed-card {
      width: 100%;
    }
  }
</style>
