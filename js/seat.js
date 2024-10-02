const setBtn = document.getElementById("setBtn");
const tableBoxEl = document.getElementById("tablebox");

let pickedNums = [];
let pickedNames = [];
let namesList = []; // 이름 목록을 저장할 배열

// 랜덤 번호 선택 함수
function selectNum(cnt) {
  let pickNum = _.random(1, cnt);
  while (pickedNums.includes(pickNum)) {
    pickNum = _.random(1, cnt);
  }
  pickedNums.push(pickNum); // 선택된 번호를 pickedNums에 추가
  return pickNum;
}

// 배치도 생성
function makeTable(col, row) {
  tableBoxEl.innerHTML = "";
  const tableChild = tableBoxEl.appendChild(document.createElement("table"));
  tableChild.id = "seatTable";

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

      // 드래그 이벤트 핸들러
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
        dragEl.innerHTML = tdEls.innerHTML;
        tdEls.innerHTML = dragNum;
        console.log(dragNum);
        console.log(e.textContent);
      });
    }
  }
}

// 자리 배치 (이름에 순차적으로 번호 할당, 테이블에 랜덤 번호 할당)
function pushNumAndName() {
  let noUseCnt = document.querySelectorAll(".noUse").length;
  const nowRow = document.getElementById("inputRow").value;
  const nowCol = document.getElementById("inputCol").value;
  const seatTable = tableBoxEl.firstChild;
  const maxNum = nowCol * nowRow - noUseCnt;
  if (
    nowCol == seatTable.children.length &&
    nowRow == seatTable.firstChild.children.length
  ) {
    if (maxNum === namesList.length) {
      let index = 0; // 이름과 순차적 번호를 할당할 때 사용할 인덱스
      const seatTable = document.getElementById("seatTable");
      const childInTable = seatTable.childNodes;

      for (let i = 0; i < childInTable.length; i++) {
        let childInTr = childInTable[i].childNodes;
        for (let j = 0; j < childInTr.length; j++) {
          if (
            childInTr[j].tagName === "TD" &&
            !childInTr[j].classList.contains("noUse")
          ) {
            if (index < namesList.length) {
              let randomSeatNum = selectNum(maxNum); // 좌석 번호는 랜덤하게
              childInTr[j].innerHTML = `${randomSeatNum}. ${
                namesList[randomSeatNum - 1]
              }`;
              index++;
            }
          }
        }
      }
    } else {
      alert(
        `좌석 수(${maxNum}석)와 인원 수(${namesList.length}명)가 일치하지 않습니다.`
      );
    }
  } else {
    alert("입력하신 가로, 세로가 변경되어 배치도를 다시 생성합니다.");
    makeTable(nowCol, nowRow);
  }
}

// 자리 배치 버튼을 생성하는 함수
function makePushBtn() {
  if (!document.getElementById("pushBtn")) {
    const pushBtn = document
      .getElementById("ctrBox")
      .appendChild(document.createElement("div"));
    pushBtn.append("자리 배치");
    pushBtn.className = "btn";
    pushBtn.id = "pushBtn";

    // 자리 배치 버튼 클릭 시 실행
    pushBtn.addEventListener("click", () => {
      namesList = document.getElementById("namesInput").value.split(" "); // 입력된 이름들을 배열로 분리
      const tds = document.querySelectorAll("td");
      for (let i = 0; i < tds.length; i++) {
        tds[i].innerHTML = "";
      }
      pickedNums = [];
      pickedNames = [];
      pushNumAndName(); // 이름에 순차적으로 번호를 배정하고, 테이블에는 랜덤 번호를 배정
    });
  }
}

// "자리 배치 생성" 버튼 클릭 시 실행되는 함수
setBtn.addEventListener("click", () => {
  let rowCnt = document.getElementById("inputRow").value;
  let colCnt = document.getElementById("inputCol").value;
  alert("칸을 클릭하여 해당 칸을 미사용 칸으로 지정할 수 있습니다.");
  makePushBtn();
  makeTable(colCnt, rowCnt);
});
