const setBtn = document.getElementById('setBtn');
const tableBoxEl = document.getElementById("tablebox");
const addTable = document.createElement("table");
const addTr = document.createElement("tr")
const addTd = document.createElement("td")

function makeTable (col, row){
  const tableChild = document.getElementById("tablebox").appendChild(document.createElement("table"))
  for (let i = 0; i < col; i++) {
    let trEls = tableChild.appendChild(document.createElement('tr'))
    for (let j = 0; j < row; j++) {
      trEls.appendChild(document.createElement('td'))
    }
  }
}

setBtn.addEventListener('click', () => {
  document.getElementById("tablebox").innerHTML = ""
  let rowCnt = document.getElementById('inputRow').value;
  let colCnt = document.getElementById('inputCol').value;
  makeTable(colCnt, rowCnt)
});