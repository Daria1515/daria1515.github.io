//This code controls the mechanics of language-changing
let lang = localStorage.getItem("water-lang")
if(lang == null){
    lang = default_lang
    localStorage.setItem("water-lang", lang)
}

window.addEventListener('load', () => {

    let sel = document.getElementById("lang-select")
    
    //if some lang was already selected
    for(let el of sel.options){
        if(el.value == lang){
            el.selected = "selected"
        }
    }

    sel.addEventListener("change", () => {
        lang = sel.options[sel.selectedIndex].value
        localStorage.setItem("water-lang", lang)
        window.location.reload()
    })

})