exports.index = function(req, res) {
  res.render('index', { title: 'Hospitales' })
};

exports.geojson = function(req, res) {
  var request = require('request'),
  config = require('../config'),
  urlFsq = "https://api.foursquare.com/v2/venues/search",
  params = {
    ll: req.query.lat + "," + req.query.lng,
    categoryId: "4bf58dd8d48988d196941735", //Id categoria Hospitales
    radius: 17000, //radio en metros para buscar hospitales
    limit: 17,
    client_id: config.my_client_id,
    client_secret: config.my_client_secret,
    v: 20120617 // version de API, revisar changelog en dev.4sq
  };
  request.get({ url:urlFsq, qs:params }, function(e, r, venues){
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }); //MIME JSON, permitir xhr externo
    res.end(venues);
  });
};
