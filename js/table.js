var quotes = [
	["Consuetudo est altera natura", "Привычка - вторая натура"],
	["Nota bene", "Заметьте хорошо!"],
	["Nulla calamitas sola", "Беда не приходит одна"],
	["Per aspera ad astra", "Через тернии к звёздам"],
	["Si vir dixit, fecit", "Пацан сказал - пацан сделал"],
	["Memento frater unum phrase: erunt omnia autem non statim", "Запомни, брат, одну простую фразу: Всё будет, но не сразу"]
];

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

quotes.sort(compareRandom);
var count = 0;
function addRow(id){
	if (count==6)
		alert("Фразы закончились!")
    var tbody = document.getElementById(id).getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    var td1 = document.createElement("TD")
    td1.appendChild(document.createTextNode(quotes[count][0]))
    var td2 = document.createElement("TD")
    td2.appendChild (document.createTextNode(quotes[count][1]))
    row.appendChild(td1);
    row.appendChild(td2);
    tbody.appendChild(row);
	count+=1;
  }

function styleChange(){
	var tables = document.getElementsByTagName("table");
	for ( var t = 0; tables[t]; t++ ) {
		var rows = tables[t].getElementsByTagName("tr");
		for ( var i = 2; rows[i]; i+=2 ) {
			rows[i].style.cssText='font-weight: bold'
    }
  }
}