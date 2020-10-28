// INTRO - UNKNOWN FUNCTION !!!!!!!!!!!!!!!
  // This will let you use the .remove() function later on
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
    };
  }

var filterEl = document.getElementById('feature-filter');
var listings = document.getElementById('listings');
var featuresInView = places.features;
var activeItemId = null;
var filterGroup = document.getElementById('filter-group');
var filterCheckbox;
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
    // load the images
    map.loadImage('marker.png', function(error, image) {
      if (error) throw error;
      if (!map.hasImage('marker-icon')) map.addImage('marker-icon', image);
    });

    map.addSource("places", {
      "type": "geojson",
      "data": places
    });

    map.addLayer({
      "id":"places-layer",
      "type":"symbol",
      "source":"places",
      "paint":{

      },
      "layout":{
        "icon-image":"marker-icon",
        "icon-size":0.8
      }
    });

    /**
     * Add all the things to the page:
     * - The location listings on the side of the page
     * - The markers onto the map
    */   

     // layer interactivity
    map.on("mouseenter", "places-layer", function(e) {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "places-layer", function(e) {
      map.getCanvas().style.cursor = "";
    });

    map.on("click", "places-layer", function(e) {
      let features = map.queryRenderedFeatures(e.point, { layers: ['places-layer'] });

      if(features[0]) {
        activeItemId = 'listing-' + features[0].properties.id;

        createPopUp(features[0]);
        flyToplace(features[0]);       
      }

    });

    map.on('moveend', function(e) {
      console.log("Movend");
      displayFeaturesOnMap();
    });

    
    buildLocationList(places.features);
  });

  // filter features on map move
  function displayFeaturesOnMap() {
    var features = map.queryRenderedFeatures({ layers: ['places-layer'] });
    console.log(features);
    if (features) {
      // Populate features for the listing overlay.
      buildLocationList(features);

      // Clear the input container
      filterEl.value = '';

      // Store the current features in sn `places` variable to
      // later use for filtering on `keyup`.
      featuresInView = features;
    }

    if(activeItemId) {
      updateActiveListItem(activeItemId);
    }
  }

  // Update active list item with class active
  function updateActiveListItem(activeItemId) {
    if(!activeItemId) return;

    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }

    var listing = document.getElementById(activeItemId);
    listing.classList.add('active');
  }

// MARKER FUNCTION !!!!!!!!!!!!!!!
  /**
   * Add a marker to the map for every place listing.
  **/
  function filterControl() {
    // FILTER FUNCTION !!!!!!!!!!!!!!!
    let tags = [... new Set(places.features.map(feature => feature.properties.tag))];
    tags.push("Deselect All");

    tags.forEach(function(tag) {
      var source = 'places' + tag;

    // Add a layer for this symbol type if it hasn't been added already.
      
      // Add checkbox and label elements for the layer.
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.id = tag;
      input.name = tag
      input.classList.add("filter")
      input.checked = true;
      filterGroup.appendChild(input);

      var label = document.createElement('label');
      label.setAttribute('for', tag);
      label.id = tag.toLocaleLowerCase().replace(" ", '-');
      label.textContent = tag;
      filterGroup.appendChild(label);      
    });

      // When the checkbox changes, update the visibility of the layer.
      filterCheckbox = document.querySelectorAll('.filter');

      filterCheckbox.forEach(filterElement => {
        filterElement.addEventListener('input', function (e) {
          let target = e.target;

          console.log(target.checked);

          if(target.name == "Deselect All") {
            let selectAllLabel = document.getElementById('deselect-all');

            if(target.checked) {
              selectAllLabel.textContent = "Deselect All";
            }else {
              selectAllLabel.textContent = "Select All";
            }
          }        

          // get checked place type
          var placeType = {
            value:target.checked,
            name:target.id
          };

          // filter function
          getPlaceType(placeType)
        });

      });
  }

  // filter data matching the give criteria
  function getPlaceType({value, name}) {
    let data = JSON.parse(JSON.stringify(places));

    if(name == "Deselect All" && value) {
      filterCheckbox.forEach(checkbox => {
        checkbox.checked = true;
        return checkbox;
      });

    } else if (name == "Deselect All" && !value) {
      filterCheckbox.forEach(checkbox => {
        checkbox.checked = false;
        return checkbox;
      });
      
      data.features = [];
    } else {
      // get all the checbox values 
      let filterValues = [];

      filterCheckbox.forEach(checkbox => {
        if(checkbox.checked) {
          filterValues.push(checkbox.id);
        }
      });

      console.log(filterValues);
      filterValues = filterValues.indexOf('Deslect All') ? filterValues.slice(0,-1) : filterValues;

      // --------- multiple filters --------
      // get the data matching the criteria
      data.features = data.features.filter(feature => filterValues.indexOf(feature.properties.tag) !== -1);
    }

    

    // update the listing
    buildLocationList(data.features);

    // update filter feature
    featuresInView = data.features;

    // update the map
    map.getSource("places").setData(data)
  }

  filterControl();

// LISTING FUNCTION !!!!!!!!!!!!!!!
/**
 * Add a listing for each place to the sidebar.
**/
  function buildLocationList(data) {
    // clear all the data from listing
    listings.innerHTML = "";

    data.forEach(function(place, i){
      /**
       * Create a shortcut for `place.properties`,
       * which will be used several times below.
      **/
      var prop = place.properties;

      /* Add a new listing section to the sidebar. */
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
      link.innerHTML = "<div>"+ prop.city  +"<h4>"+prop.country+"</h4></div>" + "<img src='"+prop.img+ "'</img>";

      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the place associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked place
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
      **/
      link.addEventListener('click', function(e) {

        for (var i=0; i < data.length; i++) {
          if (this.id === "link-" + data[i].properties.id) {
            var clickedListing = data[i];

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
        '<a  href="' + currentFeature.properties.url + '">'+
        '<img src="'+currentFeature.properties.img+ '"/>' +
        '</a>'+
        '<h4>' + currentFeature.properties.country + '</h4>' +
        '<h5>'+ currentFeature.properties.tag + '. ' + currentFeature.properties.city + '</h5>' +
        '<a href=' + currentFeature.properties.url + ' class="read-more">Read More!</a>')
      .addTo(map);
  }


  // SEARCH FUNCTION !!!!!!!!!!!!!!!
  filterEl.addEventListener('keyup', function (e) {
    var value = normalize(e.target.value);

    // if(value)

    // Filter visible features that don't match the input value.
    var filtered = featuresInView.filter(function (feature) {
      var city = normalize(feature.properties.city);
      var country = normalize(feature.properties.country);
      return city.indexOf(value) > -1 || country.indexOf(value) > -1;
    });

    console.log(filtered);
    buildLocationList(filtered);
  });

  function normalize(string) {
    return string.trim().toLowerCase();
  }


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
