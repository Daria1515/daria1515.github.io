//displays the number of moves in the corresponding HTML tag
function displayMoveCnt(){
    let cnt = parseInt(localStorage.getItem("move_cnt") | "0")
    document.getElementById("movecnt").innerHTML = dictionary[lang].moves + ": " + String(cnt)
    return cnt
}
//move_cnt += a
function changeMoveCnt(a){
    let cnt = parseInt(localStorage.getItem("move_cnt") | "0")
    localStorage.setItem("move_cnt", cnt + a)
    displayMoveCnt()
}