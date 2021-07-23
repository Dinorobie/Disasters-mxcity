// Reactive Buttons 
function modalstyleAbout(){
  console.log("You made click on button")
  var modal = d3.selectAll("#About").style("display", "block")
}

function modalstyleContact(){
  console.log("You made click on button")
  var modal = d3.selectAll("#Contact").style("display", "block")
}

function btncloseAbout(){
  console.log("You made click on close")
  var modal = d3.selectAll("#About").style("display", "none")
}

function btncloseContact(){
  console.log("You made click on close")
  var modal = d3.selectAll("#Contact").style("display", "none")
}

d3.selectAll("#modal1").on("click", modalstyleAbout);
d3.selectAll("#modal2").on("click", modalstyleContact);

d3.selectAll("#close1").on("click", btncloseAbout);
d3.selectAll("#close2").on("click", btncloseContact);

//////////////////////////////////////////////////////////////////////


// Creating map object

async function loadMap() {

  //////////////////////////////////////////////////////////////////////
  // Base Tiles

  // Adding tile layer
  var OSM = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // // Satelite View Tile (ESRI)
  // var ESRI = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  //   tileSize: 512,
  //   maxZoom: 18,
  //   zoomOffset: -1,
  //   id: "mapbox/ESRI",
  //   accessToken: API_KEY
  // });

  // // Black and White View Tile (CARTO)
  // var CARTO = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  //   subdomains: 'abcd',
  //   maxZoom: 19,
  //   tileSize: 512,
  //   zoomOffset: -1,
  //   id: "mapbox/Carto",
  //   accessToken: API_KEY
  // });

  // // Base Tile Controler
  // var baseMaps = {
  //   'OpenStreetMap (OSM)': OSM,
  //   'Satellite View (ESRI)': ESRI
  //   // 'B&W View (Carto)': CARTO
  // };

  //////////////////////////////////////////////////////////////////////

  // Use this link to get the geojson data.
  var link_riesgos = "http://127.0.0.1:5000/agebs";
  var link_alcaldias = "http://127.0.0.1:5000/alcaldias";

  // // Function that will determine the color of a neighborhood based on the borough it belongs to

  function chooseColor(i) {
    switch (i) {
      case "Muy Bajo":
        return "moccasin";
      case "Bajo":
        return "orange";
      case "Medio":
        return "orangered";
      case "Alto":
        return "red";
      case "Muy Alto":
        return "darkred";
      default:
        return "gray";
    }
  }

  var riesgo_precipitacion = new L.LayerGroup()
  var riesgo_granizo = new L.LayerGroup()
  var riesgo_sismico = new L.LayerGroup()
  var riesgo_inundacion = new L.LayerGroup()
  var riesgo_laderas = new L.LayerGroup()
  var riesgo_tormentaElectrica = new L.LayerGroup()

  //AGEBS PRECIPITACION
  await d3.json(link_riesgos).then(function (data) {

    L.geoJson(data, {
      style: function (feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.Riesgo_precipitacion),
          fillOpacity: 0.4,
          weight: 0.5
        };
      }
    }).addTo(riesgo_precipitacion);
    riesgo_precipitacion.setZIndex(1000);

    L.geoJson(data, {
      style: function (feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.riesgo_sismico),
          fillOpacity: 0.4,
          weight: 0.5
        };
      }
    }).addTo(riesgo_sismico);
    riesgo_sismico.setZIndex(1000);

    L.geoJson(data, {
      style: function (feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.riesgo_granizo),
          fillOpacity: 0.4,
          weight: 0.5
        };
      }
    }).addTo(riesgo_granizo);
    riesgo_granizo.setZIndex(1000);

    L.geoJson(data, {
      style: function (feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.riesgo_inundacion),
          fillOpacity: 0.4,
          weight: 0.5
        };
      }
    }).addTo(riesgo_inundacion);
    riesgo_inundacion.setZIndex(1000);

    L.geoJson(data, {
      style: function (feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.riesgo_laderas),
          fillOpacity: 0.4,
          weight: 0.5
        };
      }
    }).addTo(riesgo_laderas);
    riesgo_laderas.setZIndex(1000);

    L.geoJson(data, {
      style: function (feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.riesgo_tormentaElectrica),
          fillOpacity: 0.4,
          weight: 0.5
        };
      }
    }).addTo(riesgo_tormentaElectrica);
    riesgo_tormentaElectrica.setZIndex(1000);
  });

  // ALCALDIAS
  var alcaldias = new L.LayerGroup()
  await d3.json(link_alcaldias).then(function (data) {
    L.geoJson(data, {
      style: {
        fillColor: 'transparent',
        color: 'black',
        weight: 1.5,
      }
    }).addTo(alcaldias)
  });
  alcaldias.setZIndex(2);
  

  // // Layer Selector
  var layerMaps = {
    'Riesgo por Precipitaciones': riesgo_precipitacion,
    'Riesgo por Inundaciones': riesgo_inundacion,
    'Riesgo por Tormenta Eléctrica': riesgo_tormentaElectrica,
    'Riesgo por Granizo': riesgo_granizo,
    'Riesgo por Derrumbe de Laderas': riesgo_laderas,
    'Riesgo Sismico': riesgo_sismico
  };

  //////////////////////////////////////////////////////////////////////

  var myMap = L.map("map", {
    center: [19.329705, -99.164239],
    zoom: 11,
    layers: [OSM, riesgo_precipitacion, alcaldias]
  });

  L.control.layers(layerMaps, null, { collapsed: false }).addTo(myMap);

  //////////////////////////////////////////////////////////////////////
  // Legend

  var legend = L.control({ position: 'bottomleft' });
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    var labels = ["Very Low", "Low", 'Medium', 'High', 'Very High'];
    var grades = ['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Muy Alto'];
    div.innerHTML = '<div><b>Legend</b></div';
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<b style="background:' + chooseColor(grades[i]) + ' ">&nbsp;</b>&nbsp;&nbsp;' + labels[i] + '<br/>';
    }
    return div;
  }
  legend.addTo(myMap)

}
//////////////////////////////////////////////////////////////////////

loadMap();


