//////////////////////////////////////////////////////////////////////
// Use this link to get the geojson data.
var link_riesgos = "http://127.0.0.1:5000/agebs";
var link_alcaldias = "http://127.0.0.1:5000/alcaldias";

//////////////////////////////////////////////////////////////////////

// Reactive Buttons 
function modalstyleAbout() {
  console.log("You made click on button")
  var modal = d3.selectAll("#About").style("display", "block")
}

function modalstyleContact() {
  console.log("You made click on button")
  var modal = d3.selectAll("#Contact").style("display", "block")
}

function btncloseAbout() {
  console.log("You made click on close")
  var modal = d3.selectAll("#About").style("display", "none")
}

function btncloseContact() {
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
    'Rain Risk': riesgo_precipitacion,
    'Flood Risk': riesgo_inundacion,
    'Electric Storm Risk': riesgo_tormentaElectrica,
    'Hailstorm Risk': riesgo_granizo,
    'Landslide Risk': riesgo_laderas,
    'Earthquake Risk': riesgo_sismico
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
d3.selectAll("#selalcaldia").on("change", barchart);

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
  var p_mb = [], p_b = [], p_m = [], p_a = [], p_ma = []
  var g_mb = [], g_b = [], g_m = [], g_a = [], g_ma = []
  var i_mb = [], i_b = [], i_m = [], i_a = [], i_ma = []
  var l_mb = [], l_b = [], l_m = [], l_a = [], l_ma = []
  var s_mb = [], s_b = [], s_m = [], s_a = [], s_ma = []
  var t_mb = [], t_b = [], t_m = [], t_a = [], t_ma = []

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


    var indices= ["Rain", "Hailstorm", "Floods", "Lanslides", "Earthquakes", "Electric Storm"] 
    var y1 = [p_mb.length / precipitacion.length * 100, g_mb.length / granizo.length * 100, i_mb.length / inundacion.length * 100, l_mb.length / laderas.length * 100, s_mb.length / sismos.length * 100, t_mb.length / tormenta.length * 100]
    var y2 = [p_b.length / precipitacion.length * 100, g_b.length / granizo.length * 100, i_b.length / inundacion.length * 100, l_b.length / laderas.length * 100, s_b.length / sismos.length * 100, t_b.length / tormenta.length * 100]
    var y3 = [p_m.length / precipitacion.length * 100, g_m.length / granizo.length * 100, i_m.length / inundacion.length * 100, l_m.length / laderas.length * 100, s_m.length / sismos.length * 100, t_m.length / tormenta.length * 100]
    var y4 = [p_a.length / precipitacion.length * 100, g_a.length / granizo.length * 100, i_a.length / inundacion.length * 100, l_a.length / laderas.length * 100, s_a.length / sismos.length * 100, t_a.length / tormenta.length * 100]
    var y5 = [p_ma.length / precipitacion.length * 100, g_ma.length / granizo.length * 100, i_ma.length / inundacion.length * 100, l_ma.length / laderas.length * 100, s_ma.length / sismos.length * 100, t_ma.length / tormenta.length * 100]
    var trace1 = {
      x: indices,
      y: y1,
      name: "Very Low",
      type: "bar",
      marker: {
        color: 'rgb(255,228,181)',
        opacity: 1
      }
    }

    var trace2 = {
      x: indices,
      y: y2,
      name: "Low",
      type: "bar",
      marker: {
        color: 'rgb(255,165,0)',
        opacity: 1
      }
    }

    var trace3 = {
      x: indices,
      y: y3,
      name: "Medium",
      type: "bar",
      marker: {
        color: 'rgb(255,69,0)',
        opacity: 1
      }
    }

    var trace4 = {
      x: indices,
      y: y4,
      name: "High",
      type: "bar",
      marker: {
        color: 'rgb(255,0,0)',
        opacity: 1
      }
    }

    var trace5 = {
      x: indices,
      y: y5,
      name: "Very High",
      type: "bar",
      marker: {
        color: 'rgb(139,0,0)',
        opacity: 1
      }
    }

    var data = [trace1, trace2, trace3, trace4, trace5]
    var layout = {
      barmode: 'stack',
      xaxis: {
        tickangle: 0
      },
      autosize: false,
        margin: {
          l: 50,
          r: 50,
          b: 150,
          t: 0
        }
    };
    Plotly.newPlot("district-chart", data, layout);


  });
};

//////////////////////////////////////////////////////////////////////
//Barplot
// set the dimensions and margins of the graph
function plotter(risk) {

  var margin = { top: 20, right: 100, bottom: 20, left: 30 },
    width = 670 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // 
  function filter_by_riesgo(riesgo) {
    var filtro;
    if (riesgo === "Precipitacion") {
      return filtro = "Riesgo_precipitacion";
    } else if (riesgo === "Granizo") {
      return filtro = "riesgo_granizo";
    }
    else if (riesgo === "Inundacion") {
      return filtro = "riesgo_inundacion";
    } else if (riesgo === "Laderas") {
      return filtro = "riesgo_laderas";
    } else if (riesgo === "Sismico") {
      return filtro = "riesgo_sismico";
    } else if (riesgo === "Tormenta") {
      return filtro = "riesgo_tormentaElectrica";
    }

  }
  // Parse the Data

  d3.json(link_riesgos).then((mydata) => {

    data2 = mydata[0]['features']

    console.log(data2);
    console.log('-----------------')
    var filtro = filter_by_riesgo(risk);

    //our subgroups
    var subgroups = ["Muy Bajo", "Bajo", "Medio", "Alto", "Muy Alto"]
    //Delegaciones, to load them dynamically based on selection
    //Filter values by delegacion.

    //Calculate the json object with all the subgroups after it was filtered
    var data = [{ group: "Xoch", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Alva", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Azca", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Beni", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Coyo", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Cuaj", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Cuau", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Iztac", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Iztap", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Magda", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Migu", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Milp", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Tlah", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 },
    { group: "Venu", "Muy Bajo": 0, "Bajo": 0, "Medio": 0, "Alto": 0, "Muy Alto": 0 }
    ];

    console.log('-----------------')
    console.log(data)
    console.log('-----------------')

    for (i = 0; i < data2.length; i++) {
      var alcaldia;
      if (data2[i].properties.alcaldia === "lvaro Obregn") {
        alcaldia = "Alva";
      } else if (data2[i].properties.alcaldia === "Azcapotzalco") {
        alcaldia = "Azca";
      } else if (data2[i].properties.alcaldia === "Benito Jurez") {
        alcaldia = "Beni";
      } else if (data2[i].properties.alcaldia === "Coyoacn") {
        alcaldia = "Coyo";
      } else if (data2[i].properties.alcaldia === "Cuajimalpa de Morelos") {
        alcaldia = "Cuaj";
      } else if (data2[i].properties.alcaldia === "Cuauhtmoc") {
        alcaldia = "Cuau";
      } else if (data2[i].properties.alcaldia === "Iztacalco") {
        alcaldia = "Iztac";
      } else if (data2[i].properties.alcaldia === "Iztapalapa") {
        alcaldia = "Iztap";
      } else if (data2[i].properties.alcaldia === "La Magdalena Contreras") {
        alcaldia = "Magda";
      } else if (data2[i].properties.alcaldia === "Miguel Hidalgo") {
        alcaldia = "Migu";
      } else if (data2[i].properties.alcaldia === "Milpa Alta") {
        alcaldia = "Milp";
      } else if (data2[i].properties.alcaldia === "Tlhuac") {
        alcaldia = "Tlah";
      } else if (data2[i].properties.alcaldia === "Venustiano Carranza") {
        alcaldia = "Venu";
      } else if (data2[i].properties.alcaldia === "Xochimilco") {
        alcaldia = "Xoch";
      }
      var tracker;
      for (j = 0; j < data.length; j++) {
        if (data[j].group === alcaldia) {
          tracker = j;
          break;
        }
      }
      var riesgo_record = data2[i].properties[filtro]
      data[tracker][riesgo_record] += 1

    }
    console.log(data)


    // Transpose the data into layers
    var dataset = d3.layout.stack()(subgroups.map(function (grade) {
      console.log('----------Holaaa --------------')
      return data.map(function (d) {
        return { x: d.group, y: +d[grade] };
      });
    }));
    console.log("This is the dataset")
    console.log(dataset)

    // Set x, y and colors
    var x = d3.scale.ordinal()
      .domain(dataset[0].map(function (d) { return d.x; }))
      .rangeRoundBands([10, width - 10], 0.02);

    var y = d3.scale.linear()
      .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y; }); })])
      .range([height, 0]);

    var colors = ["moccasin", "orange", "orangered", "red", "darkred"];
    // Define and draw axes
    var yAxis = d3.axisLeft()
      .scale(y)
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat(function (d) { return d });

    var xAxis = d3.axisBottom()
      .scale(x)
      ;

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    // Create groups for each series, rects for each segment 
    var groupsx = svg.selectAll("g.cost")
      .data(dataset)
      .enter().append("g")
      .attr("class", "cost")
      .style("fill", function (d, i) { return colors[i]; });

    var tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip.append("rect")
      .attr("width", 30)
      .attr("height", 20)
      .attr("fill", "black")
      .style("opacity", 0.5);

    tooltip.append("text")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    var rect = groupsx.selectAll("rect")
      .data(function (d) { return d; })
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.x); })
      .attr("y", function (d) { return y(d.y0 + d.y); })
      .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand())
      .on("mouseover", function () { tooltip.style("display", null); })
      .on("mouseout", function () { tooltip.style("display", "none"); })
      .on("mousemove", function (d) {
        console.log("hover")
        var xPosition = d3.mouse(this)[0] - 15;
        var yPosition = d3.mouse(this)[1] - 5;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").text(d.y);
      });


    // Draw legend
    var legend = svg.selectAll(".legend")
      .data(colors)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) { return "translate(30," + i * 19 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function (d, i) { return colors.slice().reverse()[i]; });

    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function (d, i) {
        switch (i) {
          case 0: return "Muy Bajo";
          case 1: return "Bajo";
          case 2: return "Medio";
          case 3: return "Alto";
          case 4: return "Muy Alto";
        }
      });
    // Prep the tooltip bits, initial display is hidden


    // var titulo = risk + " Risk Per Alcaldia"
    // svg.append("text")
    //   .attr("x", (width / 2))
    //   .attr("y", 0 - (margin.top / 4))
    //   .attr("text-anchor", "middle")
    //   .style("font-size", "16px")
    //   .style("text-decoration", "underline")
    //   .text(titulo);


  })


}
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}
function optionChanged(risk) {
  clearBox("graph")

  plotter(risk);
}
function init() {
  plotter("Precipitacion")
  console.log('Holaa!!!!!!!!!!!!!!')
}
init();


barchart()

//////////////////////////////////////////////////////////////////////
