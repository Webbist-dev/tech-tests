<script>
export default {
  props: {
    name: {
      type: String,
      requited: true,
      default: ''
    }
  }
}
</script>

<template>
  <div
    v-if="name"
    class="anim image"
    :style="{ backgroundImage: `url(./biomes/${name}.jpg)` }"
  ></div>
</template>
