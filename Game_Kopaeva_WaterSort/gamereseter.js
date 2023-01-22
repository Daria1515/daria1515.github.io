//this code erases all the data so player can reload the game to the origin
function resetEverything(){
    localStorage.removeItem("water-username")
    localStorage.removeItem("water-level")
    localStorage.removeItem("max_level")
    localStorage.removeItem("water-save")
    localStorage.removeItem("water-undo")
    localStorage.removeItem("water-saved-level-no")
}

//this code checkes if the player passed all the lavels played
function checkGameEnd(){
    if(parseInt(localStorage.getItem("water-level")) > level_limit){
        display(dictionary[lang]["end_msg"])
        setTimeout(() => {
            resetEverything()
            window.location.reload()
        }, 2000)
    }
}

//about a button in the menu
window.addEventListener('load', () => {
    let reseter = document.getElementById("reset")
    if(reseter != null){
        reseter.addEventListener('click', () => {
            resetEverything()
            reseter.classList.add("focus_animation")
            setTimeout(() => reseter.classList.remove("focus_animation"), 500)
        })
    }
})