<script>
import { ref } from 'vue'

import useEmitter from '@/composables/useEmitter'

import SortBy from '@/components/SortBy.vue'

export default {
  components: {
    SortBy
  },
  setup() {
    const sortOption = ref('')
    const search = ref('')
    const emitter = useEmitter()

    const submit = () => {
      emitter.emit('SEARCH', search.value)
    }

    emitter.on('CLEAR_SORT', () => {
      sortOption.value = ''
    })

    return {
      search,
      submit,
      sortOption
    }
  }
}
</script>

<template>
  <div class="row heading">
    <div class="col col-xs-3">
      <div class="row">
        <div class="search">
          <button @click="submit()"></button>
          <input v-model="search" type="text" placeholder="Designation">
        </div>
        <SortBy v-model="sortOption" :data="'name'" />
      </div>
    </div>
    <div class="col col-xs-1">
      <div class="row">
        <p>Height</p>
        <SortBy v-model="sortOption" :data="'height'" />
      </div>
    </div>
    <div class="col col-xs-1">
      <div class="row">
        <p>Mass</p>
        <SortBy v-model="sortOption" :data="'mass'" />
      </div>
    </div>
    <div class="col col-xs-3">
      <div class="row">
        <p>Homeworld</p>
        <SortBy v-model="sortOption" :data="'homeworld'" />
      </div>
    </div>
    <div class="col col-xs-2">
      <div class="row">
        <p>Birth Year</p>
        <SortBy v-model="sortOption" :data="'birth_year'" />
      </div>
    </div>
    <div class="col col-xs-1">
      <div class="row">
        <p>Created</p>
        <SortBy v-model="sortOption" :data="'created'" />
      </div>
    </div>
    <div class="col col-xs-1">
      <div class="row">
        <p>Edited</p>
        <SortBy v-model="sortOption" :data="'edited'" />
      </div>
    </div>
  </div>
</template>
