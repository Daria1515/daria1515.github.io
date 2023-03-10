function setup_menu() {
    document.getElementById("reset-button").addEventListener("click", reset_level)
    document.getElementById("undo-button").addEventListener("click", perform_undo)
    check_button_status()
}

//it is called when the reset button was clicked
function reset_level(event) {
    let level
    if (undo_history.length || localStorage.getItem("water-undo").length < 4) {
        console.log(parseInt(localStorage.getItem("water-compl")))
        level = make_level(parseInt(localStorage.getItem("water-level")), parseInt(localStorage.getItem("water-compl")))
        undo_history = []
        display("&nbsp;")
    } else {
        level = load_level()
        if (!level) {
            return
        }
        display("Restored")
    }
    transition_level(level)
    check_button_status()
    if (check_win()) {
        event.stopPropagation()
        display("Restored")
    }
}

//this is called when the undo button was clicked
function perform_undo() {
    const event = undo_history.pop()
    if (!event) {
        return
    }
    const bottles = document.getElementById("game").lastChild.children
    add_water(bottles[event.s], bottles[event.t].lastChild.style.backgroundColor, event.a, true)
    remove_water(bottles[event.t], event.a, true)
    cap_full_with_single_color(bottles[event.t])
    //KR
    changeMoveCnt(-1)
    //
    display("&nbsp;")
    check_button_status()
    save_level()
}

function check_button_status() {
    const inactive = document.getElementById("undo-button").classList.contains("inactive")
    if (undo_history.length && inactive) {
        document.getElementById("undo-button").classList.remove("inactive")
    } else if (!undo_history.length && !inactive) {
        document.getElementById("undo-button").classList.add("inactive")
    }
}
