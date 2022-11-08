<script>
import { ref, reactive, computed } from 'vue'
import { getCurrentInstance } from 'vue'
import dayjs from 'dayjs'

export default {
  setup() {
    const internalInstance = getCurrentInstance()
    const { feedItBackApi } =
      internalInstance.appContext.config.globalProperties
    const date = ref(new Date())
    const since = ref(null)
    const until = ref(null)
    const users = ref([])
    const loadingState = ref(true)
    const currentPage = ref(0)
    const pageSize = reactive({
      value: 10
    })
    const totalResults = reactive({
      value: 100
    })
    const totalPages = computed(() => {
      return Math.ceil((totalResults.value - pageSize.value) / pageSize.value)
    })

    const fetchUsers = async offset => {
      return feedItBackApi
        .get(import.meta.env.VITE_API_GUESTS, {
          params: {
            limit: pageSize.value,
            offset: offset * pageSize.value
          }
        })
        .then(response => {
          loadingState.value = false
          users.value = response.data.items
        })
        .catch(error => {
          console.log(error)
        })
    }

    const fetchUsersByDateRange = async offset => {
      loadingState.value = true
      feedItBackApi
        .get(import.meta.env.VITE_API_GUESTS, {
          params: {
            limit: 100,
            since: since.value,
            until: until.value
          }
        })
        .then(response => {
          totalResults.value = response.data.items.length
          feedItBackApi
            .get(import.meta.env.VITE_API_GUESTS, {
              params: {
                limit: pageSize.value,
                offset: offset * pageSize.value,
                since: since.value,
                until: until.value
              }
            })
            .then(response => {
              loadingState.value = false
              users.value = response.data.items
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const format = dateArr => {
      since.value = dayjs(dateArr[0]).format('YYYY-MM-DD')
      until.value = dayjs(dateArr[1]).format('YYYY-MM-DD')
      const dates = dateArr.map(date => {
        return dayjs(date).format('DD-MM-YYYY')
      })

      fetchUsersByDateRange(0)

      return dates.toString()
    }

    const goToNext = () => {
      if (currentPage.value < totalResults.value) {
        currentPage.value++
        fetchUsers(currentPage.value)
      }
    }

    const goToPrevious = () => {
      if (currentPage.value > 0) {
        currentPage.value--
        fetchUsers(currentPage.value)
      }
    }

    return {
      date,
      users,
      loadingState,
      currentPage,
      totalPages,
      fetchUsers,
      fetchUsersByDateRange,
      format,
      goToNext,
      goToPrevious
    }
  },
  created() {
    this.fetchUsers(0)
  }
}
</script>

<template>
  <section>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <h2>Users</h2>
      </div>
      <div class="col-xs-12 col-md-6">
        <strong>Since</strong>
        <DatePicker v-model="date" :format="format" range></DatePicker>
      </div>
    </div>
    <div v-if="loadingState">
      <h2>Loading</h2>
    </div>
    <div v-else>
      <div v-if="users.length > 0">
        <div class="heading">
          <div class="row headings">
            <p class="col-xs-6">Name</p>
            <p class="col-xs-3">Gender</p>
            <p class="col-xs-3">Visited</p>
          </div>
        </div>
        <ul class="listing">
          <li v-for="user in users" :key="user.id" class="row item">
            <RouterLink
              :to="{ name: 'user', params: { id: user.id } }"
              class="col-xs-6"
            >
              {{ user.first_name }} {{ user.last_name }}
            </RouterLink>
            <p class="col-xs-3">{{ user.gender }}</p>
            <p class="col-xs-3">{{ $filters.formatDate(user.visited) }}</p>
          </li>
        </ul>

        <div v-if="totalPages > 2" class="pagination">
          <button :disabled="currentPage === 0" @click="goToPrevious">
            Previous
          </button>
          <p>Page {{ currentPage + 1 }} of {{ totalPages + 1 }}</p>
          <button :disabled="currentPage === totalPages" @click="goToNext">
            Next
          </button>
        </div>
      </div>
      <div v-else>
        <h2>Sorry, no results for your selected dates</h2>
      </div>
    </div>
  </section>
</template>
