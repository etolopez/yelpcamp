mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: campground.geometry.coordinates, // starting position [lng, lat]
      zoom: 7 // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

new mapboxgl.Marker({
    color: "#ff6961",
    draggable: true
})
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offser: 25 })
            .setHTML(
                `<h4>${campground.title}</h4><p>${campground.location}</p>`
            )
    )
    .addTo(map);