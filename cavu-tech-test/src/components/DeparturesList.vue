<script setup>
import axios from "axios";
import { computed, ref, watch } from "vue";
import VueFuse from "vue-fuse";
import sortByHeading from "../utils/SortBy.js";
import DepartureHeader from "./DepartureHeader.vue";
import DepartureItem from "./DeparturesItem.vue";

const isLoading = ref(true);
const loadMoreIncrement = 10;
const pageNumberValues = ref([5, 10, 25]);
const pageNumber = ref(pageNumberValues.value[0]);
const allDepartures = ref([]);
const departures = ref([]);
const departuresToEdit = ref([]);
const searchResults = ref([]);

const fuseOptions = {
  include: ["score", "matches"],
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "flightNumber",
    "airline.code",
    "airline.name",
    "arrivalAirport.code",
    "arrivalAirport.cityName",
  ],
};

// Fetch the data from the API
axios
  .get("https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata")
  .then((response) => {
    allDepartures.value = response.data.allDepartures;
    // Add total number to pageNumber toggle
    pageNumberValues.value.push(response.data.allDepartures.length);
    departures.value = allDepartures.value.slice(0, 5);
    isLoading.value = false;
  });

// Load More button
const loadMore = () => {
  const currentLength = departures.value.length;
  if (searchResults.value.length > 0) {
    departures.value = searchResults.value.slice(
      0,
      currentLength + loadMoreIncrement
    );
  } else {
    departures.value = allDepartures.value.slice(
      0,
      currentLength + loadMoreIncrement
    );
  }

  // Reset pageNumberValues
  pageNumberValues.value = [5, 10, 25, allDepartures.value.length];
  // if currentDepartures is not in the pageNumberValues array, add it then, sort array by size
  if (!pageNumberValues.value.includes(departures.value.length)) {
    pageNumberValues.value.push(departures.value.length);
    pageNumberValues.value.sort((a, b) => a - b);
  }

  pageNumber.value = departures.value.length;
};

const showLoadMore = computed(() => {
  if (searchResults.value.length > 0) {
    return departures.value.length < searchResults.value.length;
  } else {
    return departures.value.length < allDepartures.value.length;
  }
});

// Results
const getResults = (results) => {
  searchResults.value = results.map((result) => result.item);
};

const getDepartures = (search) => {
  // Reset edit
  departuresToEdit.value = [];

  if (search !== "") {
    departures.value = searchResults.value;
  } else {
    departures.value = allDepartures.value.slice(0, pageNumber.value);
  }
};

const selectFlight = (flightNumber) => {
  // Find the flight
  const flight = allDepartures.value.find(
    (flight) => flight.flightNumber === flightNumber
  );

  // If flight does not already exist in the departuresToEdit array, add it
  if (!departuresToEdit.value.includes(flight)) {
    departuresToEdit.value.push(flight);
  } else {
    // If flight already exists in the departuresToEdit array, remove it
    departuresToEdit.value = departuresToEdit.value.filter(
      (flight) => flight.flightNumber !== flightNumber
    );
  }
};

const updateStatus = ({ flightNumber, status }) => {
  const flight = allDepartures.value.find(
    (flight) => flight.flightNumber === flightNumber
  );

  flight.status = status;
};

const sortBy = (heading) => {
  // Determine is sorting search or allDepartures
  const sortArray =
    searchResults.value.length > 0 ? searchResults.value : allDepartures.value;

  // Sort based on direction, allDepartures by key, alphabetically using nested key or as dates
  departures.value = sortByHeading(sortArray, heading).slice(
    0,
    pageNumber.value
  );
};

watch(pageNumber, (newpageNumber) => {
  departures.value = allDepartures.value.slice(0, newpageNumber);
});
</script>

<template>
  <section class="listing">
    <div v-if="isLoading" class="message">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <div class="search">
        <vue-fuse
          :fuseOpts="fuseOptions"
          :list="allDepartures"
          :defaultAll="false"
          :placeholder="'Search (e.g. flight number, city name, code, airline)'"
          @fuse-input="getDepartures($event)"
          @fuse-results="getResults($event)"
        />
      </div>
      <DepartureHeader
        :searching="searchResults.length > 0"
        @sort="sortBy($event)"
      />
      <div v-if="departures.length" class="departures">
        <DepartureItem
          v-for="(departure, j) in departures"
          :key="j"
          :departure="departure"
          :searching="searchResults.length > 0"
          @selectFlight="selectFlight($event)"
        />
      </div>
      <div v-else class="message">
        <h1>No departures found</h1>
      </div>

      <div class="buttons">
        <div class="display">
          <span class="showing">
            <span>Showing</span>
            <span v-if="!searchResults.length">
              <select name="pageNumber" id="pageNumber" v-model="pageNumber">
                <option
                  v-for="(value, k) in pageNumberValues"
                  :key="k"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </span>
            <span v-else>
              {{ departures.length }}
            </span>
            <span>of {{ allDepartures.length }} total departures</span>
          </span>
        </div>

        <button v-if="showLoadMore" @click="loadMore" class="button">
          Load more
        </button>
      </div>

      <div v-if="departuresToEdit.length" class="edit">
        <h2>
          Now editing {{ departuresToEdit.length }} departure
          <span v-if="departuresToEdit.length > 1">s</span>
        </h2>
        <div class="departures editing">
          <DepartureItem
            v-for="(departure, j) in departuresToEdit"
            :key="j"
            :departure="departure"
            :editing="true"
            @updateStatus="updateStatus($event)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
