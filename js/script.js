let x = [677, 550, 550, 550, 677, 677];
let y = [340, 323, 152, 242, 152, 255];
let startX = [210, 210, 210, 370, 370, 350];
let startY = [140, 350, 240, 260, 350, 160];
let startDeg = [0, 90, 0, 0, 180, 0];
let deg = [0, 90, 0, 0, 180, 0];

let block = document.getElementsByClassName('pic');
let wrap = document.getElementsByClassName('wrap');
let main = document.getElementById('main');
let ch = document.getElementById("ch");
let reset = document.getElementById("reset");
let house = document.getElementsByClassName('pic0').item(0);

for (let i = 0; i < 6; i++) {
    rotate(i);
    moving(i);
}
ch.onclick = function () {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum += check(i);
    }
    if (sum === 6) {
        for (let i = 0; i < 6; i++) {
            wrap.item(i).style.left = -9999 + "px";
        }
        house.style.left = 550 + "px";
        house.animate([
            {transform: 'translate(0)'},
            {transform: 'translate(-20px, 0px)'},
            {transform: 'translate(0px, 10px)'},
            {transform: 'translate(20px, 0px)'},
            {transform: 'translate(0px, -10px)'},
        ], 1500);
    }
};
reset.onclick = function () {
    for (let i = 0; i < 6; i++) {
        startPos(i);
    }
    house.style.left = -9999 + "px";
};

function check(i) {
    if (Math.abs(wrap.item(i).offsetLeft - x[i]) < 30 &&
        Math.abs(wrap.item(i).offsetTop - y[i]) < 30 &&
        deg[i] % 360 === 0) {
        wrap.item(i).style.left = x[i] + 'px';
        wrap.item(i).style.top = y[i] + "px";
        block.item(i).style.border = 0;
        return 1;
    }
    return 0;
}

function rotate(i) {
    block.item(i).ondblclick = function () {
        block.item(i).style.transform = 'rotate(' + (deg[i] - 45) + 'deg)';
        deg[i] = deg[i] - 45;
    }
}

function startPos(i) {
    wrap.item(i).style.left = startX[i] + 'px';
    wrap.item(i).style.top = startY[i] + "px";
    block.item(i).style.border = 2 + "px dotted gray";
    block.item(i).style.transform = 'rotate(' + (startDeg[i]) + 'deg)';
    deg[i] = startDeg[i];
}

function moving(i) {
    block.item(i).ondragstart = function () {
        return false;
    };
    block.item(i).onmousedown = function (e) {
        block.item(i).style.border = 2 + "px solid gray";
        let coords = getCoords(i);
        let shiftX = e.clientX - coords.left;
        let shiftY = e.clientY - coords.top;
        wrap.item(i).style.zIndex = 100;
        document.onmousemove = function (e) {
            moveAt(e);
        };
        block.item(i).onmouseup = function () {
            document.onmousemove = null;
            block.item(i).style.border = 2 + "px dashed gray";
        };

        function moveAt(e) {
            wrap.item(i).style.left = e.clientX - main.offsetLeft - shiftX + 'px';
            wrap.item(i).style.top = e.clientY - main.offsetTop - shiftY + 'px';
        }
    };

    function getCoords(i) {
        let pic = wrap.item(i).getBoundingClientRect();
        return {
            top: pic.top + pageYOffset,
            left: pic.left + pageXOffset
        };
    }
}
