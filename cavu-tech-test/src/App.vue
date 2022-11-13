<script setup>
import IconDepartures from "./components/icons/IconDepartures.vue";
import DeparturesList from "./components/DeparturesList.vue";
</script>

<template>
  <div id="app">
    <header>
      <IconDepartures />
      <h1>Departures</h1>
    </header>

    <main>
      <DeparturesList />
    </main>
  </div>
</template>

<style scoped>
header {
  display: flex;
  padding: 38px 55px 26px;
  margin-bottom: 10px;
  background: var(--background-yellow);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

main {
  background: var(--background-grey);
  padding: 18px 25px 76px 55px;
}

h1 {
  margin-left: 20px;
}
</style>
