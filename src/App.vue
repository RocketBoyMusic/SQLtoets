<script setup lang="ts">
import MonacoLoader from './components/MonacoLoader.vue';
</script>

<template>
  <div class="app-container">
    <header>
      <h1>SQL Test Practice</h1>
      <nav>
        <router-link to="/">Questions</router-link> |
        <router-link to="/solutions">Solutions</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>SQL Test Practice Application</p>
    </footer>
  </div>

  <!-- Load Monaco Editor -->
  <MonacoLoader />
</template>

<style>
/* Global styles */
:root {
  --primary-color: #4a6fa5;
  --secondary-color: #166088;
  --accent-color: #166088;
  --background-color: #f5f7fa;
  --text-color: #333;
  --border-color: #ddd;
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: center;
}

nav {
  margin-top: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover, nav a.router-link-active {
  background-color: var(--accent-color);
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
