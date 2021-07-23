//////////////////////////////////////////////////////////////////////
  // Use this link to get the geojson data.
  var link_riesgos = "http://127.0.0.1:5000/agebs";
  var link_alcaldias = "http://127.0.0.1:5000/alcaldias";

  //////////////////////////////////////////////////////////////////////

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

  // Black and White View Tile (CARTO)
  var CARTO = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    id: "mapbox/Carto",
    accessToken: API_KEY
  });

  // // Base Tile Controler
  // var baseMaps = {
  //   'OpenStreetMap (OSM)': OSM,
  //   'Satellite View (ESRI)': ESRI
  //   // 'B&W View (Carto)': CARTO
  // };

  //////////////////////////////////////////////////////////////////////

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

  var legend = L.control({ position: 'topleft' });
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    var labels = ["Very Low", "Low", 'Medium', 'High', 'Very High'];
    var grades = ['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Muy Alto'];
    div.innerHTML = '<div><h3 style="background:white">Risk Lvl.</h3></div';
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += '<b style="font-size:10px ; background:' + chooseColor(grades[i]) + ' ">&nbsp;</b>&nbsp;&nbsp;<strong style="font-size:15px;background:white">' + labels[i] + '</strong><br/>';
    }
    return div;
  }
  legend.addTo(myMap)

}
//////////////////////////////////////////////////////////////////////

loadMap();


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Creating the alcadias charts
d3.selectAll("#selalcaldia").on("change",barchart);

var alcaldias = []
d3.json(link_riesgos).then((data) => {

  console.log('HelloO!')
  console.log(data[0]['features']);

  data[0]['features'].forEach(d => {
    var alcaldia = d.properties.alcaldia;
    if (!alcaldias.includes(alcaldia)) {
      alcaldias.push(alcaldia)
    };
  });
  var dropdownMenu = d3.select("#selalcaldia");
    alcaldias.forEach((i) => {
      dropdownMenu
        .append("option")
        .text(i)
        .property("value", i)
    });
});

function barchart() {
  var dropdownMenu = d3.select("#selalcaldia");
  var selectedOption = dropdownMenu.property("value");
  console.log(selectedOption);
  var precipitacion = [], granizo = [], inundacion = [], laderas = [], sismos = [], tormenta = []
  var p_mb = [],p_b = [],p_m = [],p_a = [],p_ma = []
  var g_mb = [],g_b = [],g_m = [],g_a = [],g_ma = []
  var i_mb = [],i_b = [],i_m = [],i_a = [],i_ma = []
  var l_mb = [],l_b = [],l_m = [],l_a = [],l_ma = []
  var s_mb = [],s_b = [],s_m = [],s_a = [],s_ma = []
  var t_mb = [],t_b = [],t_m = [],t_a = [],t_ma = []

  d3.json(link_riesgos).then((data) => {
    data[0]['features'].forEach(d => {
      var prep = d.properties.Riesgo_precipitacion;
      var gran = d.properties.riesgo_granizo;
      var inu = d.properties.riesgo_inundacion;
      var lad = d.properties.riesgo_laderas;
      var sis = d.properties.riesgo_sismico;
      var tor = d.properties.riesgo_tormentaElectrica;

      if (selectedOption == d.properties.alcaldia) {
        precipitacion.push(prep)
        granizo.push(gran)
        inundacion.push(inu)
        laderas.push(lad)
        sismos.push(sis)
        tormenta.push(tor)
      };
    });

    // console.log(laderas)

    precipitacion.forEach((i) => {
      if (i == "Muy Bajo") {
        p_mb.push(i)
      }
      else if (i == "Bajo") {
        p_b.push(i)
      }
      else if (i == "Medio") {
        p_m.push(i)
      }
      else if (i == "Alto") {
        p_a.push(i)
      }
      else if (i == "Muy Alto") {
        p_ma.push(i)
      }
    });

    granizo.forEach((i) => {
      if (i == "Muy Bajo") {
        g_mb.push(i)
      }
      else if (i == "Bajo") {
        g_b.push(i)
      }
      else if (i == "Medio") {
        g_m.push(i)
      }
      else if (i == "Alto") {
        g_a.push(i)
      }
      else if (i == "Muy Alto") {
        g_ma.push(i)
      }
    });

    inundacion.forEach((i) => {
      if (i == "Muy Bajo") {
        i_mb.push(i)
      }
      else if (i == "Bajo") {
        i_b.push(i)
      }
      else if (i == "Medio") {
        i_m.push(i)
      }
      else if (i == "Alto") {
        i_a.push(i)
      }
      else if (i == "Muy Alto") {
        i_ma.push(i)
      }
    });

    laderas.forEach((i) => {
      if (i == "Muy Bajo") {
        l_mb.push(i)
      }
      else if (i == "Bajo") {
        l_b.push(i)
      }
      else if (i == "Medio") {
        l_m.push(i)
      }
      else if (i == "Alto") {
        l_a.push(i)
      }
      else if (i == "Muy Alto") {
        l_ma.push(i)
      }
    });

    sismos.forEach((i) => {
      if (i == "Muy Bajo") {
        s_mb.push(i)
      }
      else if (i == "Bajo") {
        s_b.push(i)
      }
      else if (i == "Medio") {
        s_m.push(i)
      }
      else if (i == "Alto") {
        s_a.push(i)
      }
      else if (i == "Muy Alto") {
        s_ma.push(i)
      }
    });

    tormenta.forEach((i) => {
      if (i == "Muy Bajo") {
        t_mb.push(i)
      }
      else if (i == "Bajo") {
        t_b.push(i)
      }
      else if (i == "Medio") {
        t_m.push(i)
      }
      else if (i == "Alto") {
        t_a.push(i)
      }
      else if (i == "Muy Alto") {
        t_ma.push(i)
      }
    });
    
    
      var indices= ["Precipitación", "Granizo", "Inundación", "Laderas", "Sismos", "Tormenta E"] 
      var y1 = [p_mb.length/precipitacion.length*100, g_mb.length/granizo.length*100, i_mb.length/inundacion.length*100, l_mb.length/laderas.length*100, s_mb.length/sismos.length*100, t_mb.length/tormenta.length*100]
      var y2= [p_b.length/precipitacion.length*100, g_b.length/granizo.length*100, i_b.length/inundacion.length*100, l_b.length/laderas.length*100, s_b.length/sismos.length*100, t_b.length/tormenta.length*100]
      var y3= [p_m.length/precipitacion.length*100, g_m.length/granizo.length*100, i_m.length/inundacion.length*100, l_m.length/laderas.length*100, s_m.length/sismos.length*100, t_m.length/tormenta.length*100]
      var y4= [p_a.length/precipitacion.length*100, g_a.length/granizo.length*100, i_a.length/inundacion.length*100, l_a.length/laderas.length*100, s_a.length/sismos.length*100, t_a.length/tormenta.length*100]
      var y5= [p_ma.length/precipitacion.length*100, g_ma.length/granizo.length*100, i_ma.length/inundacion.length*100, l_ma.length/laderas.length*100, s_ma.length/sismos.length*100, t_ma.length/tormenta.length*100] 
      var trace1={
        x: indices,
        y: y1,
        name: "Muy Bajo",
        type: "bar",
        marker: {
          color: 'rgb(255,228,181)',
          opacity: 0.7
        }
      }

      var trace2={
        x: indices,
        y: y2,
        name: "Bajo",
        type: "bar",
        marker: {
          color: 'rgb(255,165,0)',
          opacity: 0.7
        }
      }

      var trace3={
        x: indices,
        y: y3,
        name: "Medio",
        type: "bar",
        marker: {
          color: 'rgb(255,69,0)',
          opacity: 0.7
        }
      }

      var trace4={
        x: indices,
        y: y4,
        name: "Alto",
        type: "bar",
        marker: {
          color: 'rgb(255,0,0)',
          opacity: 0.7
        }
      }

      var trace5={
        x: indices,
        y: y5,
        name: "Muy Alto",
        type: "bar",
        marker: {
          color: 'rgb(139,0,0)',
          opacity: 0.7
        }
      }

      var data=[trace1, trace2, trace3, trace4, trace5]
      var layout= {
        barmode: 'stack',
        xaxis: {
          tickangle: 0
        },
      };
      Plotly.newPlot("district-chart", data, layout);
    
    
  });
};

barchart()

//////////////////////////////////////////////////////////////////////
