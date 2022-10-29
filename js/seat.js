const setBtn = document.getElementById("setBtn");
const tableBoxEl = document.getElementById("tablebox");
const addTable = document.createElement("table");
const addTr = document.createElement("tr");
const addTd = document.createElement("td");

let pickedNums = [];
function selectNum(cnt) {
  pickNum = _.random(1, cnt);
  while (pickedNums.includes(pickNum)) {
    pickNum = _.random(1, cnt);
  }
  pickedNums.push(pickNum);
  return pickNum;
}

let dragNum;
let dragEl;
// 배치도 생성
function makeTable(col, row) {
  tableBoxEl.innerHTML = "";
  const tableChild = tableBoxEl.appendChild(document.createElement("table"));
  tableChild.id = "seatTable";
  // const maxNum = col(세로) * row(가로) - noUseCnt(미사용 칸의 갯수) ;
  for (let i = 0; i < col; i++) {
    let trEls = tableChild.appendChild(document.createElement("tr"));
    for (let j = 0; j < row; j++) {
      let tdEls = trEls.appendChild(document.createElement("td"));
      tdEls.className = "use";
      tdEls.setAttribute("draggable", "true");
      tdEls.addEventListener("click", () => {
        if (tdEls.classList.contains("use")) {
          tdEls.classList.replace("use", "noUse");
        } else {
          tdEls.classList.replace("noUse", "use");
        }
      });
      // dragAndDrop(tdEls)
      tdEls.addEventListener("drag", () => {
        tdEls.classList.add("draging");
        dragEl = tdEls;
      });
      tdEls.addEventListener("dragstart", () => {
        dragNum = tdEls.textContent;
        console.log(dragNum);
      });
      tdEls.addEventListener("dragenter", () => {
        tdEls.classList.add("enter");
      });
      tdEls.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      tdEls.addEventListener("dragleave", () => {
        tdEls.classList.remove("enter");
      });
      tdEls.addEventListener("dragend", () => {
        tdEls.classList.remove("draging");
      });
      tdEls.addEventListener("drop", (e) => {
        tdEls.classList.remove("enter");
        dragEl.textContent = tdEls.textContent;
        tdEls.textContent = dragNum;

        console.log(dragNum);
        console.log(e.textContent);
      });
    }
  }
}

// 자리배치 (배치도에 번호 할당)
function pushNum() {
  let noUseCnt = document.querySelectorAll(".noUse").length;
  const nowRow = document.getElementById("inputRow").value;
  const nowCol = document.getElementById("inputCol").value;
  const seatTable = tableBoxEl.firstChild;
  if (
    nowCol == seatTable.children.length &&
    nowRow == seatTable.firstChild.children.length
  ) {
    const maxNum = nowCol * nowRow - noUseCnt;
    const seatTable = document.getElementById("seatTable");
    const childInTable = seatTable.childNodes;
    for (let i = 0; i < childInTable.length; i++) {
      console.log(childInTable);
      let childInTr = childInTable[i].childNodes;
      for (let j = 0; j < childInTr.length; j++) {
        if (
          (childInTr[j].tagName =
            "td" && !childInTr[j].classList.contains("noUse"))
        ) {
          console.log(childInTr);
          childInTr[j].append(selectNum(maxNum));
        }
      }
      console.log(maxNum);
    }
  } else {
    alert("입력하신 값이 변경되어, 배치도를 다시 생성합니다.");
    makeTable(nowCol, nowRow);
  }
}

function makePushBtn() {
  if (!document.getElementById("pushBtn")) {
    const pushBtn = document
      .getElementById("ctrBox")
      .appendChild(document.createElement("div"));
    pushBtn.append("자리 배치");
    pushBtn.className = "btn";
    pushBtn.id = "pushBtn";
    pushBtn.addEventListener("click", () => {
      const tds = document.querySelectorAll("td");
      for (let i = 0; i < tds.length; i++) {
        tds[i].innerHTML = "";
      }
      pickedNums = [];
      pushNum();
    });
  }
}

setBtn.addEventListener("click", () => {
  let rowCnt = document.getElementById("inputRow").value;
  let colCnt = document.getElementById("inputCol").value;
  alert("칸을 클릭하여 해당 칸을 미사용 칸으로 지정할 수 있습니다.");
  makePushBtn();
  makeTable(colCnt, rowCnt);
});
