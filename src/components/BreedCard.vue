<template>
  <div class="breed-card">
    <transition name="overlay">
      <div
        v-if="loading"
        class="overlay"
        :style="loadingColor"
      />
    </transition>
    <div
      @click="newImg"
      class="breed-img"
    >
      <img
        :src="img"
        alt="breed-img"
        loading="lazy"
      >
    </div>
    <div class="breed-img--loader"></div>
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
          @sub-breed="fetchSubBreedImg"
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
      expandCard: false,
      imgLoading: false
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
      this.imgLoading = false
    },
    async newImg (e) {
      this.imgLoading = true
      this.loadBar(e.target)
      await this.fetchBreedImg()
    },
    newColor () {
      return Math.floor(Math.random() * 9999999).toString(16)
    },
    async fetchSubBreedImg (event) {
      this.imgLoading = true
      this.loadBar(null, event.node)
      const { data } = await ApiService().get(`/breed/${this.breed}/${event.breed}/images/random`)
      this.img = data.message
      this.imgLoading = false
    },
    /*
     * starts loading bar incrementing in intervals
     */
    loadBar (e, domNode) {
      let elm
      if (domNode) elm = domNode
      else { elm = e.parentNode.nextElementSibling }
      elm.style.display = 'block'
      let width = 0
      let id = setInterval(f, 20)
      let vm = this
      function f () {
        if (width >= 97 && vm.imgLoading) {
          width = 97
          elm.style.width = width
        }
        if (width >= 80 && vm.imgLoading) {
          width += 0.2
          elm.style.width = width
        }
        if (width >= 100 || !vm.imgLoading) {
          elm.style.width = '100%'
          setTimeout(() => {
            elm.style.display = 'none'
          }, 500)
          clearInterval(id)
        } else {
          width++
          elm.style.width = width + '%'
        }
      }
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
    padding: 0 1em 2em 1em;
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
  .breed-img--loader {
    border: 2px solid#CEDEEA;
    width: 0;
    display: none;
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
