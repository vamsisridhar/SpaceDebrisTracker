"use strict";

var wwd = new WorldWind.WorldWindow("globe");
wwd.addLayer(new WorldWind.BMNGLandsatLayer());
wwd.addLayer(new WorldWind.AtmosphereLayer());
wwd.addLayer(new WorldWind.StarFieldLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
var renderableLayer = new WorldWind.RenderableLayer();
wwd.addLayer(renderableLayer); // Collada

var position = new WorldWind.Position(10, -5, 600000);
var colladaLoader = new WorldWind.ColladaLoader(position);
var modelAddress = "https://zglueck.github.io/workshop-demo/resources/data/satellite.dae";
colladaLoader.load(modelAddress, function (model) {
  model.scale = 500;
  renderableLayer.addRenderable(model);
  wwd.goTo(new WorldWind.Position(10, -5, 750000));
});