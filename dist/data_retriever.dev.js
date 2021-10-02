"use strict";

var spacetrack = require('spacetrack');

var satellite = require('satellite.js');

var util = require('util');

var fs = require('fs');

var _require = require('https'),
    get = _require.get;

module.exports = {
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
        var satrec = satellite.twoline2satrec(element.tle[1], element.tle[2]);
        var positionAndVelocity = satellite.propagate(satrec, new Date());
        var positionEci = positionAndVelocity.position,
            velocityEci = positionAndVelocity.velocity;
        element.position = positionEci;
        element.velocity = velocityEci;
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