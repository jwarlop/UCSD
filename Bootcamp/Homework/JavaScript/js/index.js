
$(document).ready(function(){
    $(".tbl_all").hide();
    $(".tbl_partial").hide();
});

function foo(){
    document.getElementById("demo").innerHTML="P C"
}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}

function partialTable(dtime){
    alert(datetime);
}

function handler(){
    let mdy1 = /^\d\/\d\d\/\d\d\d\d$/;
    let mdy2 = /^\d\d\/\d\/\d\d\d\d$/;
    let mdy3 = /^\d\/\d\/\d\d\d\d$/;
    let mdy4 = /^\d\d\/\d\d\/\d\d\d\d$/;
    let dt_ = $("#dtime").val().toLowerCase();
    let c_  = $("#city").val().toLowerCase();
    let st_ = $("#state").val().toLowerCase();
    let co_ = $("#country").val().toLowerCase();
    let sh_ = $("#shape").val().toLowerCase();
    if(dt_.length > 0 & 
        !(mdy1.test(dt_) |  mdy2.test(dt_) | mdy3.test(dt_) | mdy4.test(dt_))){
           alert("Invalid Date Format");
       }
    else{
        a = ["datetime","city","state","country","shape","comments"];
        t = '<table class="tbl_results"><tr><td>Date</td><td>City</td><td>State</td>';
        t += "<td>Country</td><td>Shape</td><td>Comment</td></tr>";
        var rc = 0;
        for(var i = 0; i < sightings.length ; i++){
            let dt__ = sightings[i].datetime;
            let c__ = sightings[i].city;
            let st__ = sightings[i].state;
            let co__ = sightings[i].country;
            let sh__ = sightings[i].shape;
            if( dt_.length == 0 & c_.length == 0 & st_.length == 0 
                & co_.length == 0 & sh_.length == 0){
                break;
            }
            if( (dt_ === dt__ | dt_.length == 0) &
                (c_ === c__ | c_.length == 0) &
                (st_ === st__ | st_.length == 0) &
                (co_ === co__ | co_.length == 0) &
                (sh_ === sh__ | sh_.length == 0)){ 
                rc++;
                t += "<tr>";
                for(var j = 0; j < 6; j++){
                    t += "<td>";
                    t += sightings[i][a[j]];
                    t += "</td>";
                }
                t += "</tr>";
            }
        }
        t += "</table>";
    }
    $(".zz").html("Total Records: "+rc+"<br>"+t);
    
    
}

function popTable(){
    alert(sightings[0]["city"]);
    $("#tbl_partial").html
    //$.getJSON("data/dataPart.json",function(json){
      //  console.log(json);
    //});
}