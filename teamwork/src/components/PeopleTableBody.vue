<script>
import PlanetLink from '@/components/PlanetLink.vue'

export default {
  components: {
    PlanetLink
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="body">
    <div class="row">
      <div class="col col-xs-3">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <h3>{{ person.name }}</h3>
        </div>
      </div>

      <div class="col col-xs-1">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <p v-if="person.height === 'unknown'">
            <span class="aurek-besh">unknown</span>
          </p>
          <p v-else>
            <span class="number">{{ person.height }}</span>
            <span class="aurek-besh">cm</span>
          </p>
        </div>
      </div>

      <div class="col col-xs-1">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <p v-if="person.mass === 'unknown'">
            <span class="aurek-besh">unknown</span>
          </p>
          <p v-else>
            <span class="number">{{ person.mass }}</span>
            <span class="aurek-besh">kg</span>
          </p>
        </div>
      </div>

      <div class="col col-xs-3">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <PlanetLink :key="person" :url="person.homeworld" />
        </div>
      </div>

      <div class="col col-xs-2">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <p v-if="person.birth_year === 'unknown'">
            <span class="aurek-besh">unknown</span>
          </p>
          <p v-else class="number">{{ person.birth_year }}</p>
        </div>
      </div>

      <div class="col col-xs-1">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <p>{{ $filters.formatDate(person.created) }}</p>
        </div>
      </div>

      <div class="col col-xs-1">
        <div v-for="(person, index) in data" :key="index" class="cell">
          <p>{{ $filters.formatDate(person.edited) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
