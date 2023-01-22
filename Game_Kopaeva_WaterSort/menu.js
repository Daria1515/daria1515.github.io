//this function loads data from localStorage to display the recent data in the menu
function load_menu() {
    const level_config = document.getElementById("level")
    let level = parseInt(localStorage.getItem("water-level"))
    level_config.value = parseInt(localStorage.getItem("water-level"))
    if(parseInt(localStorage.getItem("max_level") | "0") < level) localStorage.setItem("max_level", level)
    let maxlev = parseInt(localStorage.getItem("max_level"))
    //checking if the player tries to jump to a valid level
    level_config.addEventListener(
        "input",
        () => {
            let value = parseInt(level_config.value)
            if (1 <= value && value <= maxlev) {
                level_config.classList.remove("wrong")
                localStorage.setItem("water-level", value)
            } else {
                level_config.classList.add("wrong")
            }
        }
    );

    //player can select a level of complexity
    const compl_config = document.getElementById("complex")
    let compl = localStorage.getItem("water-compl")
    if(compl == null){
        compl = default_complexity
        localStorage.setItem("water-compl", compl)
    }
    for(let el of compl_config.children){
        if(el.value == compl){
            el.selected = "selected"
        }
    }
    compl_config.addEventListener(
        "change",
        () => {localStorage.setItem("water-compl", compl_config.options[compl_config.selectedIndex].value)}
    )

    const transition_config = document.getElementById("transitions")
    transition_config.checked = localStorage.getItem("water-disable-transitions") != "true"
    transition_config.addEventListener(
        "change",
        () => {localStorage.setItem("water-disable-transitions", !transition_config.checked)}
    );

    const slow_config = document.getElementById("slow")
    slow_config.checked = localStorage.getItem("water-slow-transitions") == "true"
    slow_config.addEventListener(
        "change",
        () => {localStorage.setItem("water-slow-transitions", slow_config.checked)}
    );

    const dark_config = document.getElementById("dark")
    dark_config.checked = localStorage.getItem("water-dark-mode") == "true"
    dark_config.addEventListener(
        "change",
        () => {
            localStorage.setItem("water-dark-mode", dark_config.checked)
            document.body.style.transition = "color 1000ms, background-color 1000ms"
            document.body.classList.toggle("dark")
        }
    );
    if (localStorage.getItem("water-dark-mode") == "true") {
        document.body.classList.add("dark")
    }

    const small_config = document.getElementById("small")
    const tiny_config = document.getElementById("tiny")
    const tiny_value = localStorage.getItem("water-scaledown")
    small_config.checked = tiny_value == "1" || tiny_value == "2"
    tiny_config.checked = tiny_value == "2"
    const tiny_callback = () => {localStorage.setItem(
        "water-scaledown", 0 + small_config.checked + tiny_config.checked
    )}
    small_config.addEventListener("change", tiny_callback);
    tiny_config.addEventListener("change", tiny_callback);

    const instant_new_level_config = document.getElementById("instant-new-level")
    instant_new_level_config.checked = !(localStorage.getItem("water-instant-new-level") == "false")
    instant_new_level_config.addEventListener(
        "change",
        () => {localStorage.setItem("water-instant-new-level", instant_new_level_config.checked)}
    );
}
