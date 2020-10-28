// INTRO - UNKNOWN FUNCTION !!!!!!!!!!!!!!!
  // This will let you use the .remove() function later on
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
    };
  }

// DATA SOURCE - GEOJSON FORMAT!!!!!!!!!!!!!!!
  var places = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.034084142948,
            38.909671288923
          ]
        },
        "properties": {
          "city": "Washington DC",
          "country": "United States",
          "url":"www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": true,
          "Mountain": false,
          "Forest": true,
          "tag":"Forest"

        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.049766,
            38.900772
          ]
        },
        "properties": {
          "city": "Washington DC",
          "country": "United States",
          "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": true,
          "Mountain": false,
          "Forest": true,
          "tag":"Island"

        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043929,
            38.910525
          ]
        },
        "properties": {
          "city": "Washington DC",
	  "country": "United States",
          "url": "www.google.com",
          "img":"shop.jpg",
	  "imglist":"shop.jpg",
          "Island": true,
          "Mountain": false,
          "Forest": false,
          "tag":"Mountain"

        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.0672,
            38.90516896
          ]
        },
        "properties": {
          "city": "Washington DC",
          "country": "United States",
          "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": false,
          "Forest": true,
          "tag":"Island"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.002583742142,
            38.887041080933
          ]
        },
        "properties": {
          "city": "Washington DC",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": true,
          "Forest": false,
          "tag":"Island"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -76.933492720127,
            38.99225245786
          ]
        },
        "properties": {
          "city": "College Park",
          "country": "United States",
  	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": true,
          "Forest": false,
          "tag":"Island"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.097083330154,
            38.980979
          ]
        },
        "properties": {
          "city": "Bethesda",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": true,
          "Forest": false,
          "tag":"Coastal"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.359425054188,
            38.958058116661
          ]
        },
        "properties": {
          "city": "Reston",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": true,
          "Forest": false,
          "tag":"Coastal"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.10853099823,
            38.880100922392
          ]
        },
        "properties": {
          "city": "Arlington",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": true,
          "Mountain": false,
          "Forest": false,
          "tag":"Forest"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.28784,
            40.008008
          ]
        },
        "properties": {
          "city": "Ardmore",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": true,
          "Forest": false,
          "tag":"Island"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.20121216774,
            39.954030175164
          ]
        },
        "properties": {
          "city": "Philadelphia",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": false,
          "Mountain": true,
          "Forest": false,
          "tag":"Mountain"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            -77.043959498405,
            38.903883387232
          ]
        },
        "properties": {
          "city": "Washington DC",
          "country": "United States",
	  "url": "www.google.com",
          "img":"shop.jpg",
          "imglist":"shop.jpg",
          "Island": true,
          "Mountain": false,
          "Forest": false,
          "tag":"Island"
        }
      }
    ]
  };
  /**
   * Assign a unique id to each place. You'll use this `id` later to associate each point on the map with a listing in the sidebar.
  */
  places.features.forEach(function(place, i){
    place.properties.id = i;
  });

// SHOW THE MAP - MAPBOX CALL !!!!!!!!!!!!!!!
  /**
   * Add the map to the page
  */
  // API KEY!!!!!!!!!!!!!!!
  mapboxgl.accessToken = 'pk.eyJ1IjoidGhlc2FsdGllZXhwbG9yZXIiLCJhIjoiY2tmeTg2YWVtMXhmMDJzc3ZyOTUycTNtbyJ9.pu1-8Za3pD_7a8VXGb2Qaw';
  var filterGroup = document.getElementById('filter-group');
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-77.034084142948, 38.909671288923],
    zoom: 11,
    scrollZoom: true
  });

// ADD SOURCE DATA TO MAP !!!!!!!!!!!!!!!
  /**
   * Wait until the map loads to make changes to the map.
  */
  map.on('load', function (e) {
    /**
     * This is where your '.addLayer()' used to be, instead add only the source without styling a layer
    */
    map.addSource("places", {
      "type": "geojson",
      "data": places
    });
    /**
     * Add all the things to the page:
     * - The location listings on the side of the page
     * - The markers onto the map
    */
    buildLocationList(places);
    addMarkers();
  });

// MARKER FUNCTION !!!!!!!!!!!!!!!
  /**
   * Add a marker to the map for every place listing.
  **/
  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    places.features.forEach(function(marker) {
      /* Create a div element for the marker. */
      var el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = "marker-" + marker.properties.id;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';
      /**
       * Create a marker using the div element defined above and add it to the map.
      **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked place
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
      **/
      el.addEventListener('click', function(e){
        /* Fly to the point */
        flyToplace(marker);
        /* Close all other popups and display popup for clicked place */
        createPopUp(marker);
        /* Highlight listing in sidebar */
        var activeItem = document.getElementsByClassName('active');
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        var listing = document.getElementById('listing-' + marker.properties.id);
        listing.classList.add('active');
      });
    });
    // FILTER FUNCTION !!!!!!!!!!!!!!!
    places.features.forEach(function(feature) {
    var tag = feature.properties['tag'];
    var source = 'places' + tag;

    // Add a layer for this symbol type if it hasn't been added already.
      if (!map.getLayer(source)) {
        map.addLayer({
        'id': source,
        'type': 'circle',
        'source': 'places',
        'layout': {
          // make layer visible by default
          'visibility': 'visible'
        },
        'paint': {
          'circle-radius': 8,
          'circle-color': 'rgba(55,148,179,1)'
        },
          'filter': ['==', 'tag', tag]
        });

        // Add checkbox and label elements for the layer.
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = source;
        input.checked = true;
        filterGroup.appendChild(input);

        var label = document.createElement('label');
        label.setAttribute('for', source);
        label.textContent = tag;
        filterGroup.appendChild(label);

        // When the checkbox changes, update the visibility of the layer.
        input.addEventListener('change', function (e) {
          map.setLayoutProperty(
          source,
          'visibility',
          e.target.checked ? 'visible' : 'none'
          );
        });
      }
    });
  }

// LISTING FUNCTION !!!!!!!!!!!!!!!
/**
 * Add a listing for each place to the sidebar.
**/
  function buildLocationList(data) {
    data.features.forEach(function(place, i){
      /**
       * Create a shortcut for `place.properties`,
       * which will be used several times below.
      **/
      var prop = place.properties;

      /* Add a new listing section to the sidebar. */
      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = "listing-" + prop.id;
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item';

      /* Add the link to the individual listing created above. */
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = "link-" + prop.id;
      link.innerHTML = prop.city + "<br>" + "<img src='"+prop.img+ "'</img>" + "<h4>"+prop.country+"</h4>";

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the place associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked place
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
      **/
      link.addEventListener('click', function(e) {

        for (var i=0; i < data.features.length; i++) {
          if (this.id === "link-" + data.features[i].properties.id) {
            var clickedListing = data.features[i];

            flyToplace(clickedListing);
            createPopUp(clickedListing);
          }
        }

        var activeItem = document.getElementsByClassName('active');

        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }

        this.parentNode.classList.add('active');
      });
    });

  }

  /**
   * Use Mapbox GL JS's `flyTo` to move the camera smoothly a given center point.
  **/
  function flyToplace(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 12
    });
  }

// POPUP FUNCTION - ELEMENTS !!!!!!!!!!!!!!!
  /**
   * Create a Mapbox GL JS `Popup`.
  **/
  function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var popup = new mapboxgl.Popup({closeOnClick: true})
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML('<h3>'+ currentFeature.properties.city + '</h3>' +
        "<img src='"+currentFeature.properties.img+ "'</img>" +
        '<h4>' + currentFeature.properties.country + '</h4>' +
        '<h5>'+ currentFeature.properties.tag + '. ' + currentFeature.properties.city + '</h5>' +
        '<a href=' + currentFeature.properties.url + '>Read More!</a>')
      .addTo(map);
  }


// SEARCH FUNCTION !!!!!!!!!!!!!!!





// LAST SECTION - MAP CONTROLS!!!!!!!!!!!!!!!
  // disable map zoom when using scroll
  map.scrollZoom.disable();
  map.scrollZoom.setWheelZoomRate(0.02); // Default 1/450

  map.on("wheel", event => {
    if (event.originalEvent.metaKey) { // Check if CTRL key is pressed
      event.originalEvent.preventDefault(); // Prevent chrome/firefox default behavior
      if (!map.scrollZoom._enabled) map.scrollZoom.enable(); // Enable zoom only if it's disabled
      
    } else {
      if (map.scrollZoom._enabled) map.scrollZoom.disable(); // Disable zoom only if it's enabled
    }
  });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');
