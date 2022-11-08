<script>
import { ref } from 'vue'
import AppEmbellish from '@/components/AppEmbellish.vue'
import IntroScroll from '@/components/IntroScroll.vue'

export default {
  components: {
    AppEmbellish,
    IntroScroll
  },
  setup() {
    const showIntro = ref(true)
    const close = function () {
      this.showIntro = false
    }

    return {
      showIntro,
      close
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.showIntro) {
        this.close()
      }
    }, 50000)
  }
}
</script>

<template>
  <header id="masthead" :class="{ active: showIntro }">
    <div class="wrapper">
      <img
        alt="Star Wars"
        class="logo"
        src="@/assets/star-wars-logo.png"
        width="125"
        height="55"
      />

      <button class="button" @click="close">Skip</button>
    </div>
  </header>

  <IntroScroll :class="{ active: showIntro }" />

  <main :class="{ active: !showIntro }" class="main">
    <AppEmbellish />
    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/scss/_base.scss';
@import '@/scss/_layout.scss';
@import '@/scss/_header.scss';
@import '@/scss/_home.scss';
@import '@/scss/_table.scss';
@import '@/scss/_intro.scss';
</style>
