//Adds a text of a message into the corresponding HTML-tag
function display(message){
    let displayer = document.getElementById("messages")
    displayer.innerHTML = message
}

//displays a random message
function display_victory_message() {
    const number = Math.floor(Math.random() * dictionary[lang].victory_message.length)
    display(dictionary[lang].victory_message[number])
}