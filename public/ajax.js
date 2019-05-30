// Disable Same origin policy
//open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_sess_1" --disable-web-security

var tl = 0;

// Script parameters usin RORO pattern: Receive Objects Return Objects 
const templateObj = {
  target: '#content',
  wrapper1: 'article',
  wrapper2: 'p',
}

const ajaxcallObj = {
  method: 'GET',
  url: 'https://www.dati.lombardia.it/resource/5bbn-8w23.json',
  asynchronous: true,
}


//The experimental pipeline operator |> (currently at stage 1) pipes the value of an expression into a function. This allows the creation of chained function calls in a readable manner. The result is syntactic sugar in which a function call with a single argument can be written like this:
//callAjax |> template;

// option 1 call the function that will proceed the pipe inside.
//callAjax();
// option 2 use calls to pipe: call the funtion a pass its output to a subsequent function.
// this does not match with the asynchronous pattern 
//callAjax(template());
// option 3 call the function and its callback. Callabck will execute when the asynchronous event is complete
callAjax(ajaxcallObj, templateObj, template, drawMap);


function callAjax(call, temp, callback, callback2){
//instanzo l'oggetto XMLHttpRequest
  var xhr = new XMLHttpRequest();
  //debugger;

// comportamento dell'interprete
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){
    if(xhr.status === 200){
      //option 1 call the function that will proceed the pipe inside.
      //template(xhr.response);
      // option 2 use calls to pipe: call the funtion a pass its output to a subsequent function.
      //return xhr.response;
      // option 3 call the function and its callback. Callabck will execute when the asynchronous event is complete
      callback(xhr.response, temp);
      callback2(xhr.response);

    }
  }
}
//imposto la chiamata HTTP
xhr.open(call.method,call.url,call.asynchronous);

//invio la richiesta
xhr.send();
}

function template(response, temp){

      //console.log(JSON.parse(response)[3].id);
      //console.log(target);

      let targ = document.querySelector(temp.target);
      let resp = JSON.parse(response);

      //console.log(resp[3].id);
      //console.log(targ);

      function appendResponse(item,index,arr){
       // debugger;
        //targ.innerText += arr[index].id;
        //targ.innerText += item.id;
        let newEle1 = document.createElement(temp.wrapper1);
        let newEle2 = document.createElement(temp.wrapper2);
        let textCont = document.createTextNode(item.categoria +" - "+ item.comune);
        targ.appendChild(newEle1).appendChild(newEle2).appendChild(textCont);
        //console.log(index);
      }

      resp.forEach(appendResponse);
}

function drawMap(response){

    let resp = JSON.parse(response);
    let locations = [];

    function extract(item){
      if(item.location){
        let coor = {};
        coor.lat = item.location.coordinates[1];
        coor.lng = item.location.coordinates[0];
        //console.log(coor);
        locations.push(coor);
      }
    };
    resp.forEach(extract);
    console.log(locations);
   if(locations[0]){tlMap(locations)};
}

// veryfy data are available and gmap is sloaded: it is called by drawMap and by the Google library
function tlMap(locations){
  console.log(tl);
  tl = tl+1;
  console.log(tl);
  if(tl >= 2){initMap(locations)}
  return
  //console.log(locations);
} 

 function initMap(locations) {

//console.log(locations);

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 45, lng: 10}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        //console.log(locations);
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }