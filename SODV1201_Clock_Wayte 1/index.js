//declairing universal variables so they can be accessed in multiple functions
let tog = false;
let alarmH = null;
let alarmM = null;
let cusH = null;
let cusM = null;
let customTime=false;
let masterInterval;

//grabs the values from textboxes related to the alarm
function setAlarm(){
    alarmH = document.querySelector("#alarmHour");
    alarmM = document.querySelector("#alarmMinute");
    //this is redundant, but I couldn't seem to grab only the value function initially. So this was the fix.
    alarmH = alarmH.value;
    alarmM = alarmM.value;
}

//same situation as setAlarm plus a boolean toggle
function setCustomTime(){
    customTime = true;
    cusH = document.querySelector("#cusHour");
    cusM = document.querySelector("#cusMinute");
    cusH = cusH.value;
    cusM = cusM.value;
}

//returns the time to standard
function clearCustomTime(){
    customTime = false;
    cusH = null;
    cusM = null;
}

//this is where the magic mostly happens
function initialize(){
    //retrieving pertinent time data
    let day = new Date();
    let hour = day.getHours();
    let min = day.getMinutes();
    let sec = day.getSeconds();

    //compares hour and minute value against those for any set alarm
    if ((alarmH == hour)&&(alarmM == min)){
        //my version of an alarm going off
        alert("Your alarm is... alarming.");
        //clears data so that the alarm doesn't continue going off
        alarmH = null;
        alarmM = null;
    }

    //checks if there is a custom time set and modifies the hour and minute values
    if (customTime == true){
        hour = hAdjust(hour);
        min = mAdjust(min);
    }

    //if tog is true the time will be modified to 12 hour
    if (tog == true){
        hour = fnHr12(hour);
        sec = fnAmPm(sec);
    }

    //ensures hh:mm:ss notation
    hour = addAught(hour);
    min = addAught(min);
    sec = addAught(sec);

    //displays the time
    document.getElementById("time").textContent = hour + ":" + min + ":" + sec;

    //restarts the function after a second (probably could have used setInterval but wasn't going back to change it)
    setTimeout(initialize, 1000);
}

//adds a 0 in front of the given input if said input is a single digit
function addAught(i){
    if (i <= 9){
        i = "0" + i;
        return i;
    }
    else{return i;}
}

//adjusts the hour value for a custom time set
function hAdjust(i){
    let x = cusH - i;
    let y = x + i;
    return y;
}

//same for the minute value
function mAdjust(i){
    let x = cusM - i;
    let y = x + i;
    return y;
}

//subtracts given value by 12 if said value is grater than 12 (for 12 hour notation)
function fnHr12(i){
    if (i > 12){
        i -= 12;
        return i;
    }
    else{return i;}
}

//sticks the apropriate suffix on the end of the second value
function fnAmPm(k){
    if(k > 11){
        k = k + " PM";
    }
    else{
        k=k + " AM";
    }
    return k;
}

//recieves the command to toggle between 12 and 24 hour time
function toggle(){
    if (tog == false){
        tog = true;
        //changes the words on the button
        document.getElementById("clockFace").value = "Set to 24hr";
    }
    else if (tog == true){
        tog = false;
        //changes the words on the button
        document.getElementById("clockFace").value = "Set to 12hr";
    }
}

//recieves the command to start the stopwatch
function watchOn(){
    //begins the chain reaction which becomes a stopwatch
    masterInterval = setInterval(fnWCS, 100);
}

//stops further iterations of the function counting tenths of a second
function watchOff(){
    clearInterval(masterInterval);
}

//clears all related variables and resets the display
function resetWatch(){
    WCS = WS = WM = WH = "00";
    document.getElementById("wcs").textContent=WCS;
    document.getElementById("ws").textContent=WS;
    document.getElementById("wm").textContent=WM;
    document.getElementById("wh").textContent=WH;
}

let WCS = 0;
//counts tenths of a second
function fnWCS() {
        WCS++;
        document.getElementById("wcs").textContent=WCS;
        //iterates the second counter on every tenth iteration
        if (WCS > 9){
            //resets to 0 to begin counting again
            WCS=0
            fnWS()
        }
    }

let WS = 0;
//same logic applies to the remaining functions, with different intervals of course
function fnWS(){
    WS++;
    document.getElementById("ws").textContent=WS;
    if (WS > 59){
        WS=0
        fnWM()
    }
}

let WM = 0;
function fnWM(){
    WM++;
    document.getElementById("wm").textContent=WM;
    if (WM > 59){
        WM=0
        fnWH()
    }
}

let WH = 0;
function fnWH(){
    WH++
    document.getElementById("wh").textContent=WH;
}