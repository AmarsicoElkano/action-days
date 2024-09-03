<script setup>
import "../assets/css/main.css";
</script>

<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer v-if="$route.path !== '/'" />
  </div>
</template>