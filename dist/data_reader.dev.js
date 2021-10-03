"use strict";

/*
fetch("debrisData.json").then(results => results.json()).then(
    json => {
         for (let i = 0; i < json.table.length; i++) {
            const element = json.table[i];
            // do stuff with the data
        }

    }
);
*/
calculatingSPG4 = window.setInterval(function () {
  $.ajax({
    type: 'POST',
    url: '/'
  });
}, 5000);