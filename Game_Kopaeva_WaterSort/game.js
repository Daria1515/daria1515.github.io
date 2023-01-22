var undo_history = []

//this is reaction on player's click
function select_bottle() {
    let selected = document.getElementsByClassName("selected-bottle")

    if (selected.length) {
        let source = selected[0]
        deselect(source)

        if (source != this && source.lastChild) {
            pour(source, this)
        }
    }
    else {
        select(this)
    }
}

//select a given bottle
function select(bottle) {
    bottle.classList.add("selected-bottle")
}
//deselect
function deselect(bottle) {
    bottle.classList.remove("selected-bottle")
}

//tries to pour a water from source bottle to target bottle
function pour(source, target) {
    let color = source.lastChild.style.backgroundColor
    let bottle_space = get_bottle_space(target)

    if (bottle_space <= 0) {
        display(dictionary[lang]["bottle_full"])
    }
    else if (target.lastChild && color != target.lastChild.style.backgroundColor) {
        display(dictionary[lang]["cannot_mix"])
    }
    else {
        display("&nbsp;")
        let amount = Math.min(bottle_space, get_height(source.lastChild))
        remove_water(source, amount, true)
        add_water(target, color, amount, true)
        cap_full_with_single_color(target)

        const siblings = Array.from(source.parentNode.children)
        undo_history.push(
            {s: siblings.indexOf(source), t: siblings.indexOf(target), a: amount}
        )
        //KR
        changeMoveCnt(1)
        //
        save_level()
        check_win(true)
        check_button_status()
    }

}

//check if the bottle is full and, if so, modifies the appearence
function cap_full_with_single_color(bottle){
    if (bottle.children.length == 1 && get_height(bottle.lastChild) == BOTTLE_HEIGHT){
        bottle.classList.add("capped")
        bottle.removeEventListener("click", select_bottle)
    } else if (bottle.classList.contains("capped")) {
        bottle.classList.remove("capped")
        bottle.addEventListener("click", select_bottle)
    }
}

//checks if the level is passed
//is advance == false, the next level won't be shown anyway
function check_win(advance) {
    for (const bottle of document.getElementById("game").lastChild.children) {
        if (bottle.children.length != 0 && !bottle.classList.contains("capped")) {
            return false
        }
    }
    display_victory_message()

    if (!(localStorage.getItem("water-instant-new-level") == "false") && advance) {
        increment_level()
        next_level()
    }
    else {
        const overlay = document.createElement("div")
        overlay.classList.add("overlay")
        overlay.addEventListener("click", ()=>{
            document.body.removeChild(overlay)
            increment_level()
            next_level()
        })
        document.getElementById("toolbar").addEventListener(
            "click", ()=>{document.body.removeChild(overlay)}, {once: true}
        )
        document.body.appendChild(overlay)
    }

    return true
}

//increments a level number in the local storage
function increment_level(){
    const old_level = parseInt(localStorage.getItem("water-level"))
    localStorage.setItem("water-level", old_level + 1 + "")
}

//displays the next level
function next_level(){
    const current_level = parseInt(localStorage.getItem("water-level")), compl = parseInt(localStorage.getItem("water-compl"))
    checkGameEnd()
    const level = make_level(current_level, compl)
    document.getElementById("level-no").innerText = current_level + "." + compl
    transition_level(level)
}
