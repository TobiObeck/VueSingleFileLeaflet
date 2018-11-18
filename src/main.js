// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false;

var iconRetinaUrl =
  "https://uploads.codesandbox.io/uploads/user/b1f85807-9013-4433-87bc-14c869a966ad/ABec-marker-icon-2x.png";
var iconUrl =
  "https://uploads.codesandbox.io/uploads/user/b1f85807-9013-4433-87bc-14c869a966ad/V0w6-marker-icon.png";
var shadowUrl =
  "https://uploads.codesandbox.io/uploads/user/b1f85807-9013-4433-87bc-14c869a966ad/Jk9c-marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
