<script>
import { ref } from 'vue'
import swapi from '@/api/swapi'
import useEmitter from '@/composables/useEmitter'

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const emitter = useEmitter()

    const planet = ref([])
    const segments = props.url.split('/')
    const id = segments.pop() || segments.pop()
    const getPlanet = swapi.getPlanet(id)

    const selectPlanet = () => {
      emitter.emit('GET_PLANET', planet.value)
    }

    return {
      id,
      planet,
      getPlanet,
      selectPlanet
    }
  },
  created() {
    this.getPlanet.then(planet => {
      this.planet = planet
    })
  }
}
</script>

<template>
  <span v-if="planet.name === 'unknown'" class="planet-button aurek-besh">
    <span>{{ planet.name }}</span>
    <span class="buttons"></span>
  </span>
  <button v-else class="planet-button" @click="selectPlanet()">
    <span>
      {{ planet.name }}
    </span>
    <span class="buttons"></span>
  </button>
</template>
