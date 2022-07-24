<template>
  <div id="app">
    <nav class="nav-bar navbar navbar-light bg-light row">
      <router-link class="nav-item col" to="/">Home</router-link> 
      <router-link class="nav-item col" to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
