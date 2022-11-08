<script>
import useEmitter from '@/composables/useEmitter'

export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const emitter = useEmitter()

    const goToNext = () => {
      if (props.page < Math.ceil(props.count / 10)) {
        emitter.emit('GET_PEOPLE', props.page + 1)
      }
    }

    const goToPrev = () => {
      if (props.page > 1) {
        emitter.emit('GET_PEOPLE', props.page - 1)
      }
    }

    return {
      goToNext,
      goToPrev
    }
  }
}
</script>

<template>
  <div class="pagination">
    <div class="controls">
      <span>Data encoded [ {{ page }} / {{ Math.ceil(count / 10) }} ]</span>
      <button
        class="pager-button pager-left"
        :disabled="page === 1"
        @click="goToPrev()"
      ></button>
      <button
        class="pager-button pager-right"
        :disabled="page === Math.ceil(count / 10)"
        @click="goToNext()"
      ></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/_pagination.scss';
</style>
