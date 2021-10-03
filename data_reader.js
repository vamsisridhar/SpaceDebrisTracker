
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
var calculatingSPG4;

$('.SPG4').on('click', function(){
    if (!calculatingSPG4) {
        alert("Starting SPG4...");
        calculatingSPG4 = window.setInterval(function(){
            $.ajax({
                type: 'POST',
                url: '/'
              });
        }, 5000);
    } else{
        alert("Stopping SPG4");
        clearInterval(calculatingSPG4);
        calculatingSPG4 = null;
    }
});


