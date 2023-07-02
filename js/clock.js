const dateTime = document.getElementById("date");
const clockSection = document.getElementById("clock");

let setClock = () => {
    let d  = new Date()
    let clock = `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes()}`
    dateTime.innerText = clock
    setTimeout(setClock, 1000)
};