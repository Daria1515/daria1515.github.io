//This code asks player for his name
let authdiv, authinp, namecont, user

//animation of the form
function show_auth(){
    console.log(authdiv)
    authdiv.classList.add("focus")
    document.body.classList.add("mute")
}
function end_auth(){
    authdiv.classList.remove("focus")
    document.body.classList.remove("mute")
    namecont.innerHTML = user
}

window.onload = () => {
    authdiv = document.getElementById("auth")
    authinp = authdiv.children[0]
    namecont = document.getElementById("username")
    authinp.placeholder = dictionary[lang][authinp.placeholder]
    //checking if user is already authorized
    user = localStorage.getItem("water-username")
    if(user == null){
        show_auth()
        authinp.addEventListener("change", () => {
            user = authinp.value
            if(user != ""){
                localStorage.setItem("water-username", user)
                end_auth()
                restartTimer()
            }
        })
    }
    else end_auth()
}