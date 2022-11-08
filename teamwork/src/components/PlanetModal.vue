<script>
import PlanetImage from '@/components/PlanetImage.vue'
import useEmitter from '@/composables/useEmitter'

export default {
  components: {
    PlanetImage
  },
  props: {
    planet: {
      type: Object,
      required: true
    }
  },
  setup() {
    const emitter = useEmitter()

    const close = () => {
      emitter.emit('CLOSE_MODAL')
    }

    return {
      close
    }
  }
}
</script>

<template>
  <section class="modal-container">
    <div class="modal-header anim">
      <span class="aurek-besh">planet</span>
      <h1>{{ planet.name }}</h1>

      <button class="close" @click="close()">X</button>
    </div>
    <div class="modal-body">
      <div class="graphic-five anim"></div>
      <div class="graphic-four anim"></div>
      <div class="row">
        <div class="col-xs-4">
          <PlanetImage :key="planet" :name="planet.name" />
        </div>
        <div class="col-xs-3">
          <div class="row">
            <div class="col col-xs-6">
              <h4 class="aurek-besh">Rotation Period</h4>
              <div class="wrapper">
                <span class="value">{{ planet.rotation_period }}</span>
                <span class="aurek-besh">days</span>
              </div>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Orbital Period</h4>
              <div class="wrapper">
                <span class="value">{{ planet.orbital_period }}</span>
                <span class="aurek-besh">days</span>
              </div>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Diameter</h4>
              <div class="wrapper">
                <span v-if="planet.diameter" class="value">{{
                  $filters.numberWithCommas(planet.diameter)
                }}</span>
                <span class="aurek-besh">Di</span>
              </div>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Gravity</h4>
              <div class="wrapper">
                <span class="value">{{ planet.gravity }}</span>
                <span class="aurek-besh">G</span>
              </div>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Population</h4>
              <span v-if="planet.population" class="value">{{
                $filters.numberWithCommas(planet.population)
              }}</span>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Water</h4>
              <span class="value">{{ planet.surface_water }}%</span>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Terrain</h4>
              <span class="value">{{ planet.terrain }}</span>
            </div>

            <div class="col col-xs-6">
              <h4 class="aurek-besh">Climate</h4>
              <span class="value">{{ planet.climate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import '@/scss/_modal.scss';
</style>
