<script>
import { ref } from 'vue'
import swapi from '@/api/swapi'

import useEmitter from '@/composables/useEmitter'

import PeopleTableHeader from '@/components/PeopleTableHeader.vue'
import PeopleTableBody from '@/components/PeopleTableBody.vue'
import PaginationControls from '@/components/PaginationControls.vue'

export default {
  components: {
    PeopleTableHeader,
    PeopleTableBody,
    PaginationControls
  },
  setup() {
    let page = ref(1)
    const count = ref(0)
    const results = ref([])
    const emitter = useEmitter()

    const getPeople = () => {
      swapi
        .getPeople({
          page: page.value
        })
        .then(people => {
          results.value = people.results
          count.value = people.count
        })
      emitter.emit('CLEAR_SORT')
    }

    const searchPeople = (search) => {
      swapi
        .getPeople({
          search: search
        })
        .then(people => {
          results.value = people.results
          count.value = people.count
        })
      emitter.emit('CLEAR_SORT')
    }

    const sortByAscending = value => {
      results.value = results.value.sort((a, b) => {
        if (a[value] < b[value]) {
          return -1
        }
        if (a[value] > b[value]) {
          return 1
        }
        return 0
      })
    }

    const sortByDescending = value => {
      results.value = results.value.sort((a, b) => {
        if (a[value] > b[value]) {
          return -1
        }
        if (a[value] < b[value]) {
          return 1
        }
        return 0
      })
    }

    emitter.on('GET_PEOPLE', value => {
      page.value = value
      getPeople()
    })

    emitter.on('SEARCH', value => {
      searchPeople(value)
    })

    emitter.on('SORT_BY', sortBy => {
      if (sortBy.dir === 'asc') {
        sortByAscending(sortBy.value)
      }

      if (sortBy.dir === 'desc') {
        sortByDescending(sortBy.value)
      }
    })

    return {
      page,
      count,
      results,
      getPeople
    }
  },
  mounted() {
    this.getPeople(1)
  }
}
</script>

<template>
  <section class="table">
    <PeopleTableHeader />
    <PeopleTableBody :data="results" />
    <PaginationControls :page="page" :count="count" />
  </section>
</template>
