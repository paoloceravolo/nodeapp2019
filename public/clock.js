function time(){

var date = new Date();
var h = date.getHours(); // 0 - 23
var m = date.getMinutes(); // 0 - 59
var s = date.getSeconds(); // 0 - 59
var meridien = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        meridien = "PM";
    }
    
    // The conditional ternary operator is the only JavaScript operator that takes three operands. This operator is frequently used as a shortcut for the if statement.
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var currTime = h + ":" + m + ":" + s + " " + meridien;
    //console.log(time); 

    //var xss = "<img src='foo.img' onerror='alert(document.cookie)'>"; 

    document.getElementById("myclock").innerText = currTime ;
    //document.getElementById("myclock").innerHTML = xss;
    //document.getElementById("myclock").textContent = time;

    
    setTimeout(time, 1000);
    
}

time();