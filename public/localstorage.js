var linkTag = document.getElementsByTagName("link");

document.getElementById("light").addEventListener("click", displayTheme);
document.getElementById("dark").addEventListener("click", displayTheme);

function displayTheme(){
    var res = {light: "style.css", dark: "style2.css"};
    // addEventListener pass an event containing the properies of the element captured by the event
    var theme = this.value; 
    localStorage.setItem('theme', res[theme]);
    //console.log(localStorage.getItem('theme'));
    for(i=0;i<linkTag.length;i++){
        //  console.log(linkTag[i].href);
        var url = linkTag[i].href;
        var char = url.lastIndexOf("/") + 1;
        var filename = url.substr(char);
        if((filename == res.light || filename == res.dark) && localStorage){
        //console.log(linkTag[i].href);
        linkTag[i].href =  localStorage.getItem('theme');
        }
    };
    
}

// function displayDark(){
//    localStorage.setItem('theme', 'style2.css');
//    linkTag[0].href =  localStorage.getItem('theme');
// }

// ATTENZIONE ANDREBBE RESO UN CICLO 
if(localStorage.getItem('theme')){
linkTag[0].href =  localStorage.getItem('theme');
};


// load file 
document.querySelector("#chooseFile").addEventListener('change',loadFile, false)

function loadFile(evt){
var url;
var file;
file = evt.target.files[0];
var name = event.target.files[0].name;
var type = event.target.files[0].type;
var size = event.target.files[0].size;
var modifiedDate = event.target.files[0].lastModifiedDate;
console.log(name +" .. "+ type +" .. "+ size +" .. "+ modifiedDate);

reader = new FileReader();
//we need to instantiate a new FileReader object
reader.addEventListener("load", readFile, false);
//we add an event listener for when a file is loaded by the FileReader
//this will call our function 'readThumbNail()'

reader.readAsDataURL(file);
//we now read the data
}
function readFile(event) {
console.log(event.target.result);
var myfile =  event.target.result;
localStorage.setItem('myfile', myfile);
//console.log(localStorage.getItem('myfile'));

//This splits the string into an array of strings with the first item (index 0) containing data:image/png;base64 and the second item (index 1) containing the base64 encoded data
var base64result = localStorage.getItem('myfile').split(',')[1];
console.log(base64result);
//The WindowOrWorkerGlobalScope.btoa() method creates a base-64 encoded ASCII string from a binary string (i.e., a String object in which each character in the string is treated as a byte of binary data).
document.querySelector("#myscript").innerText = atob(base64result);
console.log(atob(base64result));
//this is our callback for when the load event is sent to the FileReader
//
//thumbnail.src = event.target.result;
//the event has a target property, the FileReader with a property 'result',
//which is where the value we read is located
}


// var worker = new Worker("webworker.js");

// worker.addEventListener("message", function(e){
//     console.log(e.data);
// });

// worker.postMessage(true);









