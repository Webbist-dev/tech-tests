<script setup>
import { ref, defineEmits } from "vue";
const props = defineProps({
  searching: Boolean,
});

const headings = ref([
  {
    label: "Departure time",
    key: "estimatedDepartureDateTime",
    direction: "asc",
  },
  { label: "City Name", key: "arrivalAirport.cityName", direction: "asc" },
  { label: "Code", key: "arrivalAirport.code", direction: "asc" },
  { label: "Airline", key: "airline.name", direction: "asc" },
  { label: "Gate", key: "departureGate.number", direction: "asc" },
  { label: "Status", key: "status", direction: "asc" },
]);

const emit = defineEmits(["sort"]);
const sortBy = (heading) => {
  emit("sort", heading);
  heading.direction = heading.direction === "asc" ? "desc" : "asc";
};
</script>

<template>
  <div class="headings">
    <span v-for="(heading, index) in headings" :key="index" class="heading">
      <button @click="sortBy(heading)">{{ heading.label }}</button>
    </span>
    <span class="heading heading__edit" v-if="props.searching">
      <button>Edit</button>
    </span>
  </div>
</template>
