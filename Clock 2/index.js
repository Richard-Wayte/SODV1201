console.log("Revving Engines");
const display = document.querySelector("#display");
const hr12 = document.getElementById("#toggle");
let day = new Date();
let hour = day.getHours();
let min = day.getMinutes();
let sec = day.getSeconds();

console.log(day);
console.log(hour);
console.log(min);
console.log(sec);

function initialize() {
    let day = new Date();
    let hour = day.getHours();
    let min = day.getMinutes();
    let sec = day.getSeconds();
    
    document.getElementById('display').textContent = hour + ":" + min + ":" + sec;
}

function fnS(i){
    i += 1;
}