<template>
  <div>
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import mymap from "vue2-leaflet";

console.log(mymap);

var { LMap, LTileLayer, LMarker } = mymap;

export default {
  name: "MyMap",
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      zoom: 8,
      center: [53.0, 13.5], //L.latLng(47.41322, -1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: [53.0, 13.5] //L.latLng(47.41322, -1.219482)
    };
  }
};
</script>
<style></style>
