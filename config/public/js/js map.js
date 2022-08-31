const { get } = require("mongoose");

mapboxgl.accessToken = 'pk.eyJ1IjoiYnRyYXZlcnN5IiwiYSI6ImNqenY5MThjMDBqZ3YzY3A0N3ppZTA5Y2QifQ.LrFjedgwlwG34TKWCpNtFg';

const map = new mapboxgl.map({
    container: 'map',
    style: 'mapbox://styles/mapbox/street-v11',
    zoom: 9,
    center: [-71.157895, 42.707741]

});

async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(store => {
        return {
            
                      type: 'Feature',
                       geometry: {
                           type: 'Point',
                           coordinates:[store.location.coordinates[0], store.location.coordinates[1]]
                       },
                     properties: {
                          storeId: store.storeId,
                           icon: 'shop'
                      }            

        }
    });

    loadMap(stores);

}

function loadMap(Stores) {
    map.on('load', function(){ map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.phg',
        function(error, image){
            if (error) throw error;
            map.addImage('cat', image);
            map.addLayer({
                id: 'points',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: Stores,
                       
                    }
                  },
                  layout: {
                    'icon-image': '{icon}-15',
                    'icon-size': 1.5,
                    'text-field':'{storeId}',
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.9],
                    'text-anchor': 'top'
                  }                 
           

            });
        }
    
    );
});
}

getStores();
