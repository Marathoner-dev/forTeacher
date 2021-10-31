const setBtn = document.getElementById('setBtn');
const tableBoxEl = document.getElementById("tablebox");
const addTable = document.createElement("table");
const addTr = document.createElement("tr");
const addTd = document.createElement("td");

let pickedNums = []
function selectNum (cnt){
  pickNum = _.random(1, cnt)
  while(pickedNums.includes(pickNum)) {
    pickNum = _.random(1, cnt)
  }
  pickedNums.push(pickNum)
  return pickNum
};


function makeTable (col, row){
  const tableChild = document.getElementById("tablebox").appendChild(document.createElement("table"));
  tableChild.id = 'seatTable'
  // const numMax = col*row ;
  for (let i = 0; i < col; i++) {
    let trEls = tableChild.appendChild(document.createElement('tr'));
    for (let j = 0; j < row; j++) {
      let tdEls = trEls.appendChild(document.createElement('td'));
      tdEls.className = 'use'
      tdEls.setAttribute('draggable', 'true')
      tdEls.addEventListener('click', () => {
        if (tdEls.classList.contains('use')) {
          tdEls.classList.replace('use', 'noUse')
        } else {
          tdEls.classList.replace('noUse', 'use')
        }
      })
      tdEls.addEventListener('drag', (event) => {
        event.preventDefault();
        tdEls.classList.add('draging')
      })
      tdEls.addEventListener('dragenter', () => {
        tdEls.classList.add('enter')
      })
      tdEls.addEventListener('dragleave', () => {
        tdEls.classList.remove('enter')
      })
      tdEls.addEventListener('dragend', () => {
        tdEls.classList.remove('draging')
      })
    }
  }
}


function pushNum () {
  let noUseCnt = document.querySelectorAll('.noUse').length
  const numMax = (document.getElementById('inputRow').value*document.getElementById('inputCol').value)-noUseCnt
  const seatTable = document.getElementById('seatTable')
  const childInTable = seatTable.childNodes;
  for (let i = 0; i < childInTable.length; i++) {
      console.log(childInTable)
      let childInTr = childInTable[i].childNodes;
      for (let j = 0; j < childInTr.length; j++) {
        if (childInTr[j].tagName = 'td' && !childInTr[j].classList.contains('noUse')){
        console.log(childInTr)
        childInTr[j].append(selectNum(numMax));
      }
    }
    console.log(numMax)
  }
}

function makePushBtn (){
  const pushBtn = document.getElementById("ctrBox").appendChild(document.createElement("div"));
  pushBtn.append('자리 배치')
  pushBtn.className = 'btn';
  pushBtn.id = 'pushBtn'
  pushBtn.addEventListener('click', () => {
    const tds = document.querySelectorAll('td')
    for (let i = 0; i < tds.length; i++) {
      tds[i].innerHTML = ''
    }
    pickedNums = []
    pushNum()
  })
}


setBtn.addEventListener('click', () => {
  alert('칸을 클릭하여 해당 칸을 미사용 칸으로 지정할 수 있습니다.')
  document.getElementById("tablebox").innerHTML = ""
  let rowCnt = document.getElementById('inputRow').value;
  let colCnt = document.getElementById('inputCol').value;
  if (!document.getElementById('pushBtn')) {
    makePushBtn()
  }
  makeTable(colCnt, rowCnt);
});