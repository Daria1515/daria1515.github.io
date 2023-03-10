let transition_timeout

function start_game() {
    apply_settings()
    let level = parseInt(localStorage.getItem("water-level")), compl = parseInt(localStorage.getItem("water-compl"))
    if (!level) {
        level = 1
        localStorage.setItem("water-level", "1")
    }
    if(!compl){
        compl = 0
        localStorage.setItem("water-compl", compl)
    }
    checkGameEnd()
    let level_data = load_level()
    if (!level_data) {
        level_data = make_level(level, compl)
        restartTimer()
        localStorage.setItem("move_cnt", 0)
        display(dictionary[lang]["sort_the_colors"])
    }
    document.getElementById("level-no").innerText = level + "." + compl

    const game = document.getElementById("game")
    game.appendChild(level_data)
    ////KR
    startTimer()
    displayMoveCnt()
    ////
    setup_menu()
    save_level()
    check_win()
}

function apply_settings() {
    if (localStorage.getItem("water-slow-transitions") == "true") {
        game.classList.add("slow")
    }
    if (localStorage.getItem("water-dark-mode") == "true") {
        document.body.classList.add("dark")
    }
    if (localStorage.getItem("water-scaledown") == "1") {
        document.getElementById("game-container").classList.add("small")
    } else if (localStorage.getItem("water-scaledown") == "2") {
        document.getElementById("game-container").classList.add("tiny")
    }
}

function transition_level(level) {
    //KR
    restartTimer()
    localStorage.setItem("move_cnt", 0)
    displayMoveCnt()
    //
    const game = document.getElementById("game")
    if (localStorage.getItem("water-disable-transitions") == "true") {
        game.replaceChildren(level)
        return
    }

    game.classList.add("transition")
    game.replaceChildren(game.lastChild, level)
    const finish_transition = () => {
        game.classList.remove("transition")
        game.removeChild(game.firstChild)
    }
    check_button_status()
    if (transition_timeout) {
        clearTimeout(transition_timeout)
    }
    transition_timeout = setTimeout(
        finish_transition,
        localStorage.getItem("water-slow-transitions") == "true" ? 5000 : 1000
    )
}

function save_level(level = null) {
    if (level == null){
        level = document.getElementById("game").lastChild
    }
    let level_data = []
    for (const bottle of level.children) {
        let bottle_data = []
        for (const fluid of bottle.children) {
            bottle_data.push({c: fluid.style.backgroundColor, a: get_height(fluid)})
        }
        level_data.push(bottle_data)
    }
    localStorage.setItem("water-save", JSON.stringify(level_data))
    localStorage.setItem("water-undo", JSON.stringify(undo_history))
    localStorage.setItem("water-saved-level-no", localStorage.getItem("water-level"))
    localStorage.setItem("water-compl-save", localStorage.getItem("water-compl"))
}

function load_level() {
    try {
        if (localStorage.getItem("water-saved-level-no") != localStorage.getItem("water-level")
        || localStorage.getItem("water-compl-save") != localStorage.getItem("water-compl")) {
            return false
        }
        const save_data = localStorage.getItem("water-save")
        if (!save_data) {
            return false
        }
        const level_data = JSON.parse(save_data)
        let bottles = []
        for (const bottle_data of level_data) {
            let bottle = add_bottle()
            for (fluid_data of bottle_data) {
                add_water(bottle, fluid_data.c, fluid_data.a)
            }
            cap_full_with_single_color(bottle)
            bottles.push(bottle)
        }
        let game = document.createElement("div")
        game.classList.add("level")
        game.replaceChildren(...bottles)
        undo_history = JSON.parse(localStorage.getItem("water-undo"))
        return game
    }
    catch(err) {
        display(dictionary[lang]["save_corrupt"])
        console.error("Error loading level data: " + err.message)
        return
    }
}
