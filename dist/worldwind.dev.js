"use strict";

var wwd = new WorldWind.WorldWindow("globe");
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.AtmosphereLayer());
wwd.addLayer(new WorldWind.StarFieldLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
var renderableLayer = new WorldWind.RenderableLayer();
wwd.addLayer(renderableLayer); // Collada

fetch("position_and_velocity_geodetic_cache.json").then(function (results) {
  return results.json();
}).then(function (json) {
  if (JSON.stringify(json) != '') {
    for (var i = 0; i < json.table.length; i++) {
      var element = json.table[i];
      var position = new WorldWind.Position(element.positionGd.longitude, element.positionGd.latitude, element.positionGd.height);
      var config = {
        dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'
      };
      alert(WorldWind.configuration.baseUrl);
      var colladaLoader = new WorldWind.ColladaLoader(position, config);
      colladaLoader.load("duck.dae", function (model) {
        model.scale = 500;
        renderableLayer.addRenderable(model);
      });
    }
  }
});