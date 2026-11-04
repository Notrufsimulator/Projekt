// Uhrzeit anzeigen

function updateClocks(){

const germanyTime =
new Date().toLocaleTimeString(
"de-DE",
{
timeZone:"Europe/Berlin"
}
);

const californiaTime =
new Date().toLocaleTimeString(
"de-DE",
{
timeZone:"America/Los_Angeles"
}
);

let g=document.getElementById("germanyTime");
let c=document.getElementById("californiaTime");

if(g){
g.innerText=germanyTime;
}

if(c){
c.innerText=californiaTime;
}

}

setInterval(updateClocks,1000);
updateClocks();


// Übersetzungen

function setLanguage(lang){

localStorage.setItem("language",lang);

if(lang==="de"){

if(document.getElementById("title")){
document.getElementById("title").innerText=
"Zeitzonen Tool";
}

if(document.getElementById("calculatorBtn")){
document.getElementById("calculatorBtn").innerText=
"Zeitrechner";
}

if(document.getElementById("dictionaryBtn")){
document.getElementById("dictionaryBtn").innerText=
"Wörterbuch";
}

}

if(lang==="en"){

if(document.getElementById("title")){
document.getElementById("title").innerText=
"Time Zone Tool";
}

if(document.getElementById("calculatorBtn")){
document.getElementById("calculatorBtn").innerText=
"Time Converter";
}

if(document.getElementById("dictionaryBtn")){
document.getElementById("dictionaryBtn").innerText=
"Dictionary";
}

}

}

window.onload=()=>{

const lang=
localStorage.getItem("language") || "de";

setLanguage(lang);

}


// Zeitrechner

function convertTime(){

const input =
document.getElementById("timeInput").value;

if(!input){
return;
}

let [hours,minutes] =
input.split(":").map(Number);

const mode =
document.getElementById("direction").value;

if(mode==="deToUs"){
hours-=9;
}
else{
hours+=9;
}

if(hours<0){
hours+=24;
}

if(hours>=24){
hours-=24;
}

document.getElementById("result")
.innerText=
String(hours).padStart(2,"0")
+
":"
+
String(minutes).padStart(2,"0");

}


// Wörterbuch

function translateWord(){

const dictionary={

hund:"dog",
katze:"cat",
haus:"house",
auto:"car",
baum:"tree",
wasser:"water",
essen:"food",
schule:"school",
computer:"computer",
hallo:"hello",

dog:"hund",
cat:"katze",
house:"haus",
car:"auto",
tree:"baum",
water:"wasser",
food:"essen",
school:"schule",
computer:"computer",
hello:"hallo"

};

const word=
document
.getElementById("wordInput")
.value
.toLowerCase()
.trim();

const result=
dictionary[word] ||
"Wort nicht gefunden";

document
.getElementById("translation")
.innerText=result;

}
