<template>
  <div>
    <button @click="panToLatLng">OK</button>
    <l-map style="height:200px;" ref="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import Vue2Leaflet from "vue2-leaflet";
//var { LMap, LTileLayer, LMarker } = Vue2Leaflet;
//after babel transpiling (probably called destructering)
//var _Vue2Leaflet = Vue2Leaflet,
//LMap = _Vue2Leaflet.LMap,
//LTileLayer = _Vue2Leaflet.LTileLayer,
//LMarker = _Vue2Leaflet.LMarker;

console.log(Vue2Leaflet);

var { L, LMap, LTileLayer, LMarker } = Vue2Leaflet;

export default {
  name: "MyMap",
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      zoom: 8,
      center: L.latLng(53.0, 13.5), //[53.0, 13.5], //L.latLng(47.41322, -1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482)
    };
  },
  methods: {
    panToLatLng: function(event) {
      console.log(this.$refs.map.mapObject);
    }
  }
};
</script>
<style></style>
