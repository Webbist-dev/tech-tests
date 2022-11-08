<template>
  <header id="masthead">
    <div class="container">
      <div class="wrapper">
        <img
          alt="FeedItBack"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/users">Users</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <main class="main">
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss">
@import '@/scss/_base.scss';
@import '@/scss/_layout.scss';
@import '@/scss/_header.scss';
@import '@/scss/_listing.scss';
@import '@/scss/_home.scss';
@import '@/scss/_user.scss';
</style>
