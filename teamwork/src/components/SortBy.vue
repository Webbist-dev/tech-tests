<script>
import { computed } from 'vue'
import useEmitter from '@/composables/useEmitter'

export default {
  props: {
    modelValue: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const emitter = useEmitter()

    const sortBy = (value, dir) => {
      emitter.emit('SORT_BY', {
        value: value,
        dir: dir
      })
    }

    const sortOption = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    return {
      sortOption,
      sortBy
    }
  }
}
</script>

<template>
  <div class="sort">
    <div class="sort-by asc">
      <input
        :id="`${data}-asc`"
        v-model="sortOption"
        type="radio"
        name="sort"
        :value="`${data}-asc`"
        @change="sortBy(data, 'asc')"
      />
      <label :for="`${data}-asc`"></label>
    </div>
    <div class="sort-by desc">
      <input
        :id="`${data}-desc`"
        v-model="sortOption"
        type="radio"
        name="sort"
        :value="`${data}-desc`"
        @change="sortBy(data, 'desc')"
      />
      <label :for="`${data}-desc`"></label>
    </div>
  </div>
</template>
