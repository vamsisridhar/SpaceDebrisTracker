"use strict";

var wwd = new WorldWind.WorldWindow("globe_canvas");
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.AtmosphereLayer());
wwd.addLayer(new WorldWind.StarFieldLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
var renderableLayer = new WorldWind.RenderableLayer();
wwd.addLayer(renderableLayer); // Collada

fetch("position_and_velocity_cache.json").then(function (results) {
  return results.json();
}).then(function (json) {
  if (JSON.stringify(json) != '') {
    for (var i = 0; i < json.table.length; i++) {
      var element = json.table[i];
      var height = Math.pow(element.positionEci.x * element.positionEci.x + element.positionEci.y * element.positionEci.y + element.positionEci.z * element.positionEci.z, 0.5);
      var longitude = Math.atan2(element.positionEci.y, element.positionEci.x) * (180 / Math.PI);
      var latitude = Math.asin(element.positionEci.z / height) * (180 / Math.PI);
      var position = new WorldWind.Position(longitude, latitude, height * 1000 - 6371000);
      var config = {
        dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'
      };
      var colladaLoader = new WorldWind.ColladaLoader(position, config);
      colladaLoader.load("duck.dae", function (model) {
        model.scale = 900;
        renderableLayer.addRenderable(model);
      });
    }
  }
});