var map;

function cleardemo() {
    document.getElementById("demo").value = [];
    document.getElementById("demo2").value = [];
}

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.751585, lng: -122.443353},
          zoom: 12
        });
      };

function markers(){
        initMap()
        var elmnt = document.getElementById("map");
        elmnt.scrollIntoView();
        var markers = [];
        var infowindows = [];

        var data = document.getElementById("demo2").value;
        console.log(data+"on markers");

        if (data.length > 0){
        for (i = 0; i < data.length; i++) {
            
        markers[i] = new google.maps.Marker({
        position: {lat: parseFloat(data[i]["lat"]), lng: parseFloat(data[i]["lng"])},
            title: data[i]["Locations"]
        });
                  
            var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+data[i]["Locations"]+'</h1>'+
            '<h3 >'+data[i]["Title"]+'</h3>'+
            '<div id="bodyContent">'+
            'Year of Release: ' + data[i]["YearofRelease"] + '<br>'+
            'Production Company: '+ data[i]["ProductionCompany"] +'<br>'+
            'Distributor: '+ data[i]["Distributor"] +'<br>'+
            'Director: '+ data[i]["Director"] + '<br>'+
            'Writer: '+ data[i]["Writer"] +'<br>'+
            'Main Actors: '+ data[i]["Actors"]+'<br>'+
            '</div>'+
            '</div>';
    
            infowindows[i] = new google.maps.InfoWindow({
            content: contentString
            });
            
            let marker = markers[i]
            let infowindow = infowindows[i]
    
            // To add the marker to the map, call setMap();
            marker.setMap(map);
    
            google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
            });
        }
    
              };
        
            };      
        
function setinputvalue(){
    $("a").click(function (){
    console.log($(this).text());
    $("#key").val($(this).text());
    var elmnt = document.getElementById("map");
    elmnt.scrollIntoView();
    var field = document.getElementById("field").value;
    var key = document.getElementById("key").value;
    var data = document.getElementById("demo").value;
    console.log(data+"on setinputvalue()")
    var matching = []

    for (i=0; i < data.length; i++) {
        if (data[i][field] == key){
        matching.push(data[i])
    }};

    console.log(matching)
    document.getElementById("demo2").value = matching; 
    markers();
    })
};

async function putintolist(data){
        var keywords = document.getElementById("key").value;
        var entry = keywords;
        var field = document.getElementById("field").value;

        if (data){

        var Arr = [];

        data.forEach(function(item){
        var i = Arr.findIndex(x => x[field] == item[field]);
        if(i <= -1){
            Arr.push({[field]: item[field]});
        }
        });

        for (i = 0; i < 10; i++) {
        var v = String(Arr[i][field])
        await $('#search-results').append('<p><a href="#map" onmouseover="setinputvalue()">'+v+'<a></p>'
        )};
        
        } else if (!data){ 
        $("#search-results").empty();
        $("#search-results").append('<p>no result</p>');
        return;
        } else if ($("#key").val() != entry)
        { return;}
};


var query = function() {
    cleardemo();
    var k = document.getElementById("key");
    var key = k.value;
    var f = document.getElementById("field");
    var field = f.value;
    var entry = key;

    $("#search-results").empty();
    if (key == ""|| key.length <= 0){    
    $("#search-results").empty();
    $("#search-results").fadeOut();
  } else {
    $("#search-results").empty();
    $("#search-results").fadeIn();
  }
      
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200 && $("#key").val() == entry) {
        // after response from node serve
        $('#search-results').empty();
        console.log("loaded suggestions");
        var data = this.responseText;
        var data = JSON.parse(data);
        console.log("original data"+data)
        document.getElementById("demo").value = data; 
        document.getElementById("demo2").value = data;
        
        putintolist(data);
        
    } else if (this.readyState == 4 && this.status == 404 && $("#key").val() == entry) {
        $("#search-results").empty();
        $("#search-results").append('<p>no result</p>');
        cleardemo();
    }} 
    xhttp.open("GET", "/search/suggest?key="+key+"&field="+field, true);
    xhttp.send();
};

