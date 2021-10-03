"use strict";

var spacetrack = require('spacetrack');

var satellite = require('satellite.js');

var projector = require('ecef-projector');

var util = require('util');

var fs = require('fs');

var _require = require('https'),
    get = _require.get;

var _require2 = require('console'),
    table = _require2.table;

module.exports = {
  getPositionAndVelocity: function getPositionAndVelocity(date) {
    json = JSON.parse(fs.readFileSync('debrisData.json'));
    console.log("Looping through JSON data");
    var obj = {
      table: []
    };

    for (var i = 0; i < json.table.length; i++) {
      var element = json.table[i];
      var satrec = satellite.twoline2satrec(element.tle[1], element.tle[2]);
      var positionAndVelocity = satellite.propagate(satrec, date);
      var positionEci = positionAndVelocity.position,
          velocityEci = positionAndVelocity.velocity; //var positionGd  = projector.unproject(positionEci)

      obj.table.push({
        i: i,
        positionEci: positionEci,
        velocityEci: velocityEci
      });
    }

    console.log(obj.table.length);
    var pvJSON = JSON.stringify(obj);
    fs.writeFile('position_and_velocity_cache.json', pvJSON, function (err) {
      if (err) {
        console.error(err);
        return;
      }
    });
    console.log("Finished writing to position_and_velocity_cache.json");
  },
  getData: function getData() {
    console.log("Loading Data..."); //alert("Getting Data");

    spacetrack.login({
      username: 'ah920@ic.ac.uk',
      password: '4tC8UmRkRz-Km_j'
    }); //alert("LOGGED IN");

    var obj = {
      table: []
    };
    spacetrack.get({
      type: 'tle_latest',
      query: [{
        field: 'OBJECT_TYPE',
        condition: 'DEBRIS'
      }, {
        field: 'ORDINAL',
        condition: '1'
      }, {
        field: 'EPOCH',
        condition: '>now-30'
      }],
      //tle_latest: ['ORDINAL', 'COMMENT', 'ORIGINATOR', 'NORAD_CAT_ID', 'OBJECT_NAME', 'OBJECT_TYPE', 'CLASSIFICATION_TYPE', 'INTLDES', 'EPOCH', 'EPOCH_MICROSECONDS', 'MEAN_MOTION', 'ECCENTRICITY', 'INCLINATION', 'RA_OF_ASC_NODE', 'ARG_OF_PERICENTER', 'MEAN_ANOMALY', 'EPHEMERIS_TYPE', 'ELEMENT_SET_NO', 'REV_AT_EPOCH', 'BSTAR', 'MEAN_MOTION_DOT', 'MEAN_MOTION_DDOT', 'FILE', 'TLE_LINE0', 'TLE_LINE1', 'TLE_LINE2', 'OBJECT_ID', 'OBJECT_NUMBER'],
      predicates: ['ORDINAL', 'COMMENT', 'ORIGINATOR', 'NORAD_CAT_ID', 'OBJECT_NAME', 'OBJECT_TYPE', 'CLASSIFICATION_TYPE', 'INTLDES', 'EPOCH', 'EPOCH_MICROSECONDS', 'MEAN_MOTION', 'ECCENTRICITY', 'INCLINATION', 'RA_OF_ASC_NODE', 'ARG_OF_PERICENTER', 'MEAN_ANOMALY', 'EPHEMERIS_TYPE', 'ELEMENT_SET_NO', 'REV_AT_EPOCH', 'BSTAR', 'MEAN_MOTION_DOT', 'MEAN_MOTION_DDOT', 'FILE', 'TLE_LINE0', 'TLE_LINE1', 'TLE_LINE2', 'OBJECT_ID', 'OBJECT_NUMBER']
    }).then(function (result) {
      //alert(satData.length);
      console.log("Calculating ECI Coords");

      for (var i = 0; i < result.length; i++) {
        var element = result[i];
        obj.table.push(element);
      }

      console.log("Writing Data to JSON");
      var json = JSON.stringify(obj);
      fs.writeFile('debrisData.json', json, function (err) {
        if (err) {
          console.error(err);
          return;
        }
      });
      console.log("Finished Upload");
    });
  }
};