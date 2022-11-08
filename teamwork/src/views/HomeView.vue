<script>
import { ref } from 'vue'
import PlanetModal from '@/components/PlanetModal.vue'
import PeopleTable from '@/components/PeopleTable.vue'
import useEmitter from '@/composables/useEmitter'

export default {
  components: {
    PlanetModal,
    PeopleTable
  },
  setup() {
    const emitter = useEmitter()
    const planet = ref({})
    const showModal = ref(false)

    emitter.on('GET_PLANET', value => {
      planet.value = value
      showModal.value = true
    })

    emitter.on('CLOSE_MODAL', () => {
      showModal.value = false
    })

    return {
      showModal,
      planet
    }
  }
}
</script>

<template>
  <div class="app">
    <span class="border top"></span>
    <span class="border bottom"></span>
    <span class="border left"></span>
    <span class="border right"></span>

    <PeopleTable
      class="app-content"
      :class="{ 'animate-out': showModal, 'animate-in': !showModal }"
    />

    <PlanetModal
      v-if="planet"
      :planet="planet"
      class="app-content"
      :class="{ 'animate-in': showModal, 'animate-out': !showModal }"
    />
  </div>
</template>
