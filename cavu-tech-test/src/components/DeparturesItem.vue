<script setup>
import { ref, defineEmits } from "vue";
import StatusClass from "../utils/StatusClass.js";

const selection = ref(null);
const freeText = ref("");

const props = defineProps({
  departure: Object,
  searching: {
    type: Boolean,
    default: false,
  },
  editing: {
    type: Boolean,
    default: false,
  },
});

const getTime = (time) => {
  const date = new Date(time);
  const timeFormat = date.toLocaleString("en-gb", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeFormat;
};

// Fetch the class for the status UI
const getClass = (status) => {
  return StatusClass(status);
};

const emit = defineEmits(["updateStatus"]);
const updateStatus = () => {
  let status = "";

  if (selection.value === "Free" || selection.value === "Diverted") {
    status =
      selection.value === "Diverted"
        ? `Diverted - ${freeText.value}`
        : freeText.value;
  } else {
    status = selection.value;
  }

  emit("updateStatus", {
    flightNumber: props.departure.flightNumber,
    status,
  });
};
</script>

<template>
  <div class="departure" :class="{ editing }" v-if="props.departure">
    <div v-if="editing" class="flightNumber">
      <p>{{ props.departure.flightNumber }}</p>
    </div>
    <div class="departure__time">
      <strong class="departure__label">Departure time</strong>
      <p>{{ getTime(props.departure.estimatedDepartureDateTime) }}</p>
    </div>
    <div class="departure__destination">
      <strong class="departure__label">City Name</strong>
      <p>{{ props.departure.arrivalAirport.cityName }}</p>
    </div>
    <div class="departure__code">
      <strong class="departure__label">Code</strong>
      <p>{{ props.departure.arrivalAirport.code }}</p>
    </div>
    <div class="departure__airline">
      <strong class="departure__label">Airline</strong>
      <p>{{ props.departure.airline.name }}</p>
    </div>
    <div class="departure__gate">
      <strong class="departure__label">Gate</strong>
      <p v-if="props.departure.departureGate">
        {{ props.departure.departureGate.number }}
      </p>
    </div>
    <div class="departure__status" :class="getClass(props.departure.status)">
      <strong class="departure__label">Status</strong>
      <p>{{ props.departure.status }}</p>
    </div>
    <div class="departure__edit" v-if="searching || editing">
      <div class="checkbox" v-if="searching">
        <input
          type="checkbox"
          :id="`departureEdit${props.departure.flightNumber}`"
          name="departureEdit"
          :key="props.departure.flightNumber"
          @change="$emit('selectFlight', props.departure.flightNumber)"
        />
        <label :for="`departureEdit${props.departure.flightNumber}`"></label>
      </div>
      <div v-if="editing">
        <select name="updateStatus" id="updateStatus" v-model="selection">
          <option value="" disabled selected>Status</option>
          <option value="Departed">Departed</option>
          <option value="Diverted">Diverted</option>
          <option value="Delayed">Delayed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Free">Free text</option>
        </select>
      </div>
      <div v-if="selection === 'Free' || selection === 'Diverted'">
        <input type="text" name="freeText" id="freeText" v-model="freeText" />
      </div>
    </div>

    <button class="button update" v-if="editing" @click="updateStatus">
      <span>Update</span>
    </button>
  </div>
</template>
