let timer_interval = null

//displays the time in the corresponding HTML tag
function displayTime(){

    let playingTime = parseInt(localStorage.getItem("playing_time") | "0")

    let m = Math.floor(playingTime/60), s = Math.floor(playingTime - 60*m)
    let str = m + ":"
    if(s < 10) str += '0'
    str += String(s)
    document.getElementById("timer").innerHTML = str

    return playingTime
}

//1 second have passed...
function tick(){
    let t = displayTime() + 1
    localStorage.setItem("playing_time", t)
    if(t > time_limit){
        display(dictionary[lang]["too_long"])
        next_level()
    }
}

function startTimer(){
    if(timer_interval) clearInterval(timer_interval)
    tick()
    timer_interval = setInterval(tick, 1000)
}

function restartTimer(){
    localStorage.setItem("playing_time", 0)
}