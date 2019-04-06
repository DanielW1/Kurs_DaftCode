// import fun from "./script"
// import "./../styles/style.scss"
var genSeconds;
var genMinutes;
var genHours;
var currHour = 0, currMin = 0, currSec = 0;

function* generatorSec(date) {
    let i = date;
    while (true) {
        i === 60 ? i = 0 : true;
        yield i++;
    }
}

function* generatorMin(date) {
    let i = ++date;
    while (true) {
        i === 60 ? i = 0 : true;
        yield i++;
    }
}

function* generatorHour(date) {
    let i = ++date;
    while (true) {
        i === 24? i=0:true;
        yield i++;
    }
}

function updateWatch() {
    window.document.body.innerHTML = '';
    const watch = window.document.createElement('div');
    currSec === 59 && currMin === 59 ? currHour = genHours.next().value:true;
    currSec === 59 ? currMin = genMinutes.next().value:true; 
    currSec = genSeconds.next().value;
    let hour = (currHour + '').padStart(2, '0');
    let min = (currMin + '').padStart(2, '0');
    let sec = (currSec + '').padStart(2, '0');
    watch.innerHTML = `${hour}:${min}:${sec}`;
    window.document.body.appendChild(watch);
}

function getStartTime() {
    const d = new Date();
    currSec = d.getSeconds();
    currMin = d.getMinutes();
    currHour = d.getHours();
    return { sec:currSec, min:currMin, hour:currHour };
}

function main() {
    const { sec, min, hour } = getStartTime();

    genSeconds = generatorSec(sec);
    genMinutes = generatorMin(min);
    genHours = generatorHour(hour);
    setInterval(updateWatch, 1000)
}

main();
