
mapboxgl.accessToken = 'pk.eyJ1Ijoia2lsdGVkMjAwMCIsImEiOiJjbGx3cHZoMmsxcHM3M2RzMjg5OHJqeHFxIn0.eelsihCh88fDJ9yfEapJUQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-90.022212, 35.143383],
    zoom: 10
});
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: 'poi', 
    limit: 0,
    // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
    // render: function (item) {
    //     const maki = item.properties.maki || 'marker';
    //     return `<div class='geocoder-dropdown-item'>
    //         <img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
    //         <span class='geocoder-dropdown-text'>
    //             ${item.text}
                
    //         </span>
    //     </div>`;
    // },
    marker: {
        color: '#821a3e',
        scale: 0.6
    },
    mapboxgl: mapboxgl
});

document.getElementById('search').appendChild(geocoder.onAdd(map));

////////////////////////////////////////////////////////////////////////////////
//display data sites array as default-
// monitor state in geocoder control
// display what is typed in the searchbox as it changes-
//maybe a li in a ul-
//use onchange in the html-
//dynamically create using DOM createElement-
//if search result is not in sites data list add new marker-
// remove sites markers that do not match search-
////////////////////////////////////////////////////////////////////////////////
//default list of sites is shown when page loads in search list-
//user starts typing in search-moniter state-
//the search list changes as user types placename-
//as search list changes the markers of non matching sites are removed from map-
//maybe add and remove classes-
//if place is in the sites list with id = 'results 'add marker otherwise remove marker-
////////////////////////////////////////////////////////////////////////////////


function hide() {
    const x = document.getElementById('sidebar');
    if (x.classList.contains('collapsed')) {
        x.classList.remove('collapsed');
    } else {
        x.classList.add('collapsed');
        document.getElementById('map').width = '100vw';
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
        name: 'Cannon Center for the Performing Arts',
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
    {
        name: 'Chucalissa Archaeological Park',
        color: '#821a3e',
        lngLat: [-90.129708, 35.062155]
    },
]

const markers = [];

sites.forEach(({ name, color, lngLat }) => {

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        name
    );
    const marker = new mapboxgl.Marker({ scale: 0.6, color })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);
        
    markers.push(marker);
})

const places = () => {
    const searchInput = document.getElementById('search');
    const results = document.getElementById('results');

    function displayResults(input) {
        results.innerHTML = '';

        if (input === '') {
            sites.forEach((site, index) => {
                const li = document.createElement('li');
                li.textContent = site.name;
                results.appendChild(li);
                markers[index].addTo(map); 
            });
        } else {
            const matchingSites = sites.filter((site, index) =>
                site.name.toLowerCase().includes(input.toLowerCase())
            );
            matchingSites.forEach((site, index) => {
                const li = document.createElement('li');
                li.textContent = site.name;
                results.appendChild(li);
                markers[index].addTo(map);
            });
            sites.forEach((site, index) => {
                if (!matchingSites.includes(site)) {
                    markers[index].remove(); 
                }
                });
        }
    }
    searchInput.addEventListener('input', function (event) {
        const inputValue = event.target.value.trim(); 
        displayResults(inputValue);
    });

    displayResults('');
};

document.addEventListener('DOMContentLoaded', function () {
    places();
});

//using zip-code layer to highlight city limits
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
});

document.getElementById('reset').addEventListener('click', () => {
    map.flyTo({
        center: [-90.022212, 35.143383],
        zoom: 10,
        pitch: 0,
    });
    window.location.reload();
});