"use strict";

fetch("debrisData.json").then(function (results) {
  return results.json();
}).then(function (json) {
  for (var i = 0; i < json.table.length; i++) {
    var element = json.table[i]; // do stuff with the data
  }
});