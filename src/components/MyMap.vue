<template>
  <div>
    <button @click="requestData">Get data</button>
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
    <span v-show="true"
      >DEBUG: coords {{ searchedLat }}, {{ searchedLong }} Lädt?

      {{ this.isCalculating }} Fehler? {{ this.isError }} <br
    /></span>
    <ul>
      <li v-show="index < 5" v-for="(coord, index) in datacoords" :key="index">
        {{ index + 1 }}: {{ coord.lat }}, {{ coord.long }}
      </li>
      <li>{{ Math.min(datacoords.length + 1, 6) }}: ...</li>
    </ul>
    <table id="coordstable">
      <tr>
        <th>No.</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
      <tr v-for="(coord, index) in datacoords" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ coord.lat }}</td>
        <td>{{ coord.long }}</td>
      </tr>
    </table>
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
      datacoords: [{ lat: 0, long: 0 }],
      searchedLat: 0,
      searchedLong: 0,
      searchInputIsDirty: false,
      searchInput: "",
      isCalculating: false,
      isError: false,
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
    requestData() {
      this.isCalculating = true;
      axios
        .get(
          "https://my-json-server.typicode.com/tobiobi/myjasonserver/coordinates"
        )
        .then(response => {
          this.datacoords = response.data;
        })
        .catch(error => {
          this.isError = true;
          console.log(error);
        })
        .finally(() => (this.isCalculating = false));
    },
    requestCoordsBySearchInput: debounce(function() {
      this.isCalculating = true;
      console.log("searchInput", this.searchInput);
      axios
        .get("https://randomuser.me/api/")
        .then(response => {
          this.searchedLat =
            response.data.results[0].location.coordinates.latitude;
          this.searchedLong =
            response.data.results[0].location.coordinates.longitude;
        })
        .catch(error => {
          this.isError = true;
          console.log(error);
        })
        .finally(() => (this.isCalculating = false));
    }, 500),
    addPushpinWithPopup(lat, long, message) {
      var tempMap = this.$refs.map.mapObject;
      L.marker([lat, long])
        .addTo(tempMap)
        .bindPopup(message)
        .openPopup();
    }
  },
  watch: {
    datacoords: function() {
      for (var i = 0; i < this.datacoords.length; i++) {
        var tempCoord = this.datacoords[i];
        this.addPushpinWithPopup(tempCoord.lat, tempCoord.long, "foo:" + i);
      }
    },
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
      var popupMessage = "Location: ";
      popupMessage += this.searchInput;
      popupMessage += " (" + this.searchedLat + ", " + this.searchedLong + ")";
      this.addPushpinWithPopup(
        this.searchedLat,
        this.searchedLong,
        popupMessage
      );
      L.circle([52.5, 13.5], { radius: 10000 * 100 }).addTo(tempMap); // radius in meters
    }
  }
};
</script>
<style>
#coordstable {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#coordstable td,
#coordstable th {
  border: 1px solid #ddd;
  padding: 8px;
}
#coordstable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#coordstable tr:hover {
  background-color: #ddd;
}

#coordstable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
