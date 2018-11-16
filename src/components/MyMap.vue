<template>
  <div>
    <input
      v-model="searchInput"
      @keydown.enter="requestCoordsBySearchInput"
      placeholder="Welche Stadt?"
    />
    <button @click="requestCoordsBySearchInput">OK</button>
    <l-map style="height:500px;" ref="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
    {{ searchedLat }} {{ searchedLong }}
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";
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
      searchedLat: 0,
      searchedLong: 0,
      searchInputIsDirty: false,
      searchInput: "",
      zoom: 3,
      center: L.latLng(53.0, 13.5), //[53.0, 13.5], //L.latLng(47.41322, -1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482)
    };
  },
  computed: {
    searchedCoordWatchHelper() {
      return this.searchedLat, this.searchedLong, Date.now();
    }
  },
  methods: {
    requestCoordsBySearchInput: debounce(function() {
      this.isCalculating = true;
      var vm = this;
      console.log("searchInput", this.searchInput);
      axios.get("https://randomuser.me/api/").then(function(response) {
        vm.searchedLat = response.data.results[0].location.coordinates.latitude;
        vm.searchedLong =
          response.data.results[0].location.coordinates.longitude;
      });
    }, 500)
  },
  watch: {
    searchInput: function() {
      this.searchInputIsDirty = true;
      this.requestCoordsBySearchInput();
    },
    searchedCoordWatchHelper: function() {
      console.log("panTo", this.searchedLat, this.searchedLong);
      var tempMap = this.$refs.map.mapObject;
      tempMap.panTo([this.searchedLat, this.searchedLong], {
        animate: true,
        duration: 5
      });
      L.marker([this.searchedLat, this.searchedLong])
        .addTo(tempMap)
        .bindPopup(
          "Standort: " +
            this.searchInput +
            " (" +
            this.searchedLat +
            ", " +
            this.searchedLong +
            ")"
        )
        .openPopup();
    }
  }
};
</script>
<style></style>
