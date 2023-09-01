
mapboxgl.accessToken = 'pk.eyJ1Ijoia2lsdGVkMjAwMCIsImEiOiJjbGx3cHZoMmsxcHM3M2RzMjg5OHJqeHFxIn0.eelsihCh88fDJ9yfEapJUQ';
const map = new mapboxgl.Map({
    container: 'map',
    // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: [-89.922409, 35.122134], // starting position [lng, lat]
    zoom: 10 // starting zoom
});



const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'poi',
    // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
    render: function (item) {
        // extract the item's maki icon or use a default
        const maki = item.properties.maki || 'marker';
        return `<div class='geocoder-dropdown-item'>
<img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
<span class='geocoder-dropdown-text'>
${item.text}
</span>
</div>`;
    },
    marker: {
        color: 'blue'
    },
    mapboxgl: mapboxgl
})


document.getElementById('search').appendChild(geocoder.onAdd(map));



function hide() {
    const x = document.getElementById('sidebar');
    if (x.classList.contains('collapsed')) {
        x.classList.remove('collapsed');
    } else {
        x.classList.add('collapsed');
        document.getElementById('map').style = 'width: 100vw;';
    }
}

map.on('load', () => {
    hide('sidebar');
});


const sites = [
    {
        name: 'Pink Palace Museum',
        color: '#821a3e',
        lngLat: [-89.959843, 35.124999]
    },
    {
        name: 'Brooks Museum',
        color: '#821a3e',
        lngLat: [-89.994457, 35.144549]
    },
    {
        name: 'McBride Rugby Pitch',
        color: '#821a3e',
        lngLat: [-89.975219, 35.128062]
    },
    {
        name: 'Cannon Center',
        color: '#821a3e',
        lngLat: [-90.051276, 35.150922]
    },
    {
        name: 'Bass Pro Shop-Pyramid',
        color: '#821a3e',
        lngLat: [-90.052024, 35.155971]
    },
    {
        name: 'University of Memphis-Main Campus',
        color: '#821a3e',
        lngLat: [-89.937324, 35.119886]
    },
    {
        name: 'The Liberty Bowl',
        color: '#821a3e',
        lngLat: [-89.979579, 35.120348]
    },
    {
        name: 'Memphis Zoo',
        color: '#821a3e',
        lngLat: [-89.993513, 35.150902]
    },
    {
        name: 'Sun Studios',
        color: '#821a3e',
        lngLat: [-90.037745, 35.139060]
    },
    {
        name: 'Beale Street',
        color: '#821a3e',
        lngLat: [-90.051399, 35.139518]
    },
    {
        name: 'Corky\'s BBQ',
        color: '#821a3e',
        lngLat: [-89.886695, 35.107927]
    },
]

sites.forEach(({ name, color, lngLat }) => {
    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        name
    );
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ scale: 0.6, color })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);
})



// // create the popup
// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//     'Mo Dhachaigh!'
// );

// // Create a default Marker and add it to the map.
// const marker1 = new mapboxgl.Marker({ scale: 0.6 })
//     .setLngLat([-89.922409, 35.122134])
//     .setPopup(popup)
//     .addTo(map);
map.on('load', () => {
    map.addSource("zip-codes", {
        type: 'geojson',
        data: 'data/zip-codes.geojson',
        promoteId: 'name'

    })
    map.addLayer({
        id: 'zip-codes-fill',
        type: 'fill',
        source: 'zip-codes',
        paint: {
            'fill-color': 'steelblue',
            'fill-opacity': 0.3
        },
        layout: {
            visibility: 'visible'
        }
    }, 'road-label');
    // map.addLayer({
    //     id: 'zip-codes-outline',
    //     type: 'line',
    //     source: 'zip-codes',
    //     paint: {
    //         'line-color': 'white',
    //         'line-width': 2

    //     }
    // }, 'road-label');

    // map.on('click', (e) => {
    //     const [selectedZip] = map.queryRenderedFeatures(e.point, {
    //         layers: ['zip-codes-fill']
    //     })
    //     if (selectedZip) {
    //         alert(`Zip Code: ${selectedZip.properties.name}`);
    //     }
    // })

    //let hoveredPolygonId = null;

    // map.on('mousemove', 'zip-codes-fill', (e) => {
    //     if (e.features.length > 0) {
    //         if (hoveredPolygonId !== null) {
    //             map.setFeatureState(
    //                 { source: 'zip-codes', id: hoveredPolygonId },
    //                 { hover: false }
    //             );
    //         }
    //         hoveredPolygonId = e.features[0].id;
    //         map.setFeatureState(
    //             { source: 'zip-codes', id: hoveredPolygonId },
    //             { hover: true }
    //         );
    //     }
    // });
    // map.on('mouseleave', 'zip-codes-fill', () => {
    //     if (hoveredPolygonId !== null) {
    //         map.setFeatureState(
    //             { source: 'zip-codes', id: hoveredPolygonId },
    //             { hover: false }
    //         );
    //     }
    //     hoveredPolygonId = null;
    // });
});

document.getElementById('reset').addEventListener('click', () => {
    map.flyTo({
        center: [-89.966707, 35.141732],
        zoom: 10,
        pitch: 0,
    });
});