var layer =  new L.StamenTileLayer("terrain");

G.map = new L.map('map', {
    center: new L.LatLng(43.1547, -77.6158),
    zoom: 9
});

G.map.addLayer(layer);
