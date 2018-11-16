<template>
  <div id="app">
    <!-- <HelloWorld /> -->
    <MyCoolMap />
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import MyCoolMap from "./components/MyMap";

export default {
  name: "App",
  components: {
    //HelloWorld,
    MyCoolMap
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
