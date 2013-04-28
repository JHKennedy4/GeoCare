var baselayer =  new L.StamenTileLayer("terrain");

G.map = new L.map('map', {
    center: new L.LatLng(43.1547, -77.6158),
    zoom: 9
});

G.map.addLayer(baselayer);

//distinct on (account_name)

function addPoint(pcp) {
    var i = 0,
        properties = pcp.properties,
        marker,
        options,
        display = function (value) {
                return value.toFixed(2);
        };
    console.log(properties);
    options = {
        data: {
            'Referals': properties.referals,
            'Gross Payments': properties.gross_payments,
            'Patient Experience Rating': properties.patient_exp,
            'Ambulatory Services': properties.ambulatory_service
        },
        chartOptions: {
            'Referals': {
                fillolor: '#1a8090',
                minValue: 800,
                maxValue: 1200,
                maxHeight: 30,
                displayText: display
            },
            'Gross Payments': {
                fillColor: '#cf7405',
                minValue: 5000,
                maxValue: 10000,
                maxHeight: 30,
                displayText: display
            },
            'Patient Experience Rating': {
                fillColor: '#7793AD',
                minValue: 0,
                maxValue: 10,
                maxHeight: 30,
                displayText: display
            },
            'Ambulatory Services': {
                fillColor: '#ffffff',
                minValue: 10000,
                maxValue: 20000,
                maxHeight: 30,
                displayText: display
            }
        },
        weight: 1,
        color: '#000000'
    };
    marker  =  new L.CoxcombChartMarker(pcp.geometry.coordinates, options);
    G.map.addLayer(marker);
}

$.ajax('http://jhk.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT DISTINCT ON (account_name) * FROM pcp&api_key=c3c310cb4bf016cd634e4df3d0a88b82826a4fbb', {
        dataType: "json",
    }).done(function (data) {
        // works!
        console.log(data);
        _.each(data.features, addPoint);
    }).fail(function () {
        alert("failasaurous-rex");
    });
