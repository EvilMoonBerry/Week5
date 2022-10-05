//Made by Petra Sjögren
//materials used to make this: Course material -> demo6-leaflet
//Credits: Got a hint fom Viia Mäntymäki how to add leaflet dependancy to CodeSandbox;

import "./styles.css";
import L from "leaflet";

const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const data = await fetch(url);
  const JSONdata = await data.json();

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
  const plus = await fetch(url2);
  const plusData = await plus.json();

  //console.log(plusData);
  const url3 =
    "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";
  const minus = await fetch(url3);
  const minusData = await minus.json();

  //console.log(JSONdata);
  //let x = Object.values(JSONdata.features.)
  //console.log(JSONdata.features[0].properties.name);
  makeMap(JSONdata);
};
fetchData();
const makeMap = (JSONdata) => {
  let map = L.map("map", {
    minZoom: -3
  });

  /*let styles = {
    weight: 3
  };*/
  let getBackground = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 15,
      attribution: "© OpenStreetMap"
    }
  ).addTo(map);

  let backgroundmap = {
    OpenStreetMap: getBackground
  };

  let geoJson = L.geoJSON(JSONdata, {
    onEachFeature: getName,
    style: styles
  }).addTo(map);

  let mapLayers = L.control.layers(backgroundmap).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

const getName = (feature, layer) => {
  if (!feature.properties.name) return;
  const city = feature.properties.name;
  //console.log(city);
  layer.bindPopup(city);
};

const styles = (feature) => {
  return {
    weight: 3
  };
};
