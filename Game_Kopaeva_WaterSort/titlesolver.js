//translates the titles of the menu to the current language
window.addEventListener('load', () => {
    for(let el of document.querySelectorAll("[word]")){
        el.insertAdjacentHTML('afterbegin', dictionary[lang][el.attributes["word"].value])
    }
})