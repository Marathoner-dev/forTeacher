const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn')
const ballEl = document.querySelector('.ball');
const fromValue = document.getElementById('from').value;
const toValue = document.getElementById('to').value;
const olCheck = document.getElementById('olCheck');
let lastFrom = document.getElementById('from').value
let lastTo = document.getElementById('to').value
let pickNum
let pickedNums = []

var ease = Circ.easeIn;

var tl = new TimelineMax({ repeat: -1, yoyo: true });
tl.add('start')
  .to('.ball', .50, {
    y: 100,
    ease: ease
  })
  .to('.ball', .10, {
    scaleY: 0.6,
    transformOrigin: 'center bottom',
    borderBottomLeftRadius: '40%',
    borderBottomRightRadius: '40%',
    ease: ease
  }, '-=.05')
  .to('.shadow', .5, {
    width: 90,
    opacity: .7,
    ease: ease
  }, 'start');

function pickNumber (from, to) {
    tl.pause()
    if (!olCheck.checked) {
      pickNum = _.random(from, to)
      while(pickedNums.includes(pickNum)) {
        pickNum = _.random(from, to)
      }
      pickedNums.push(pickNum)
    } else {
      pickedNums = []
      pickNum = _.random(from, to)
    }
    gsap.to('.ball', {
        scale : 2
    })
    gsap.to('.shadow', {
        scale : 2
    })
    ballEl.innerHTML = pickNum
}
function endShow () {
    setTimeout(() => {
        gsap.to('.ball', {
            scale : 1
        })
        gsap.to('.shadow', {
            scale : 1
        })
        ballEl.innerHTML = ""
        tl.resume()
    },3000)
}

drawBtn.addEventListener('click' ,() => {
    console.log(lastTo)
    console.log(lastFrom)
    console.log(pickedNums)
    if (lastFrom != document.getElementById('from').value || lastTo != document.getElementById('to').value) {
      lastFrom = document.getElementById('from').value
      lastTo = document.getElementById('to').value
      pickedNums = []
    }
    if (pickedNums.length >= (lastTo-lastFrom)+1) {
      alert('모든 번호가 중복됩니다, 리셋하겠습니다.')
      pickedNums = []
      return
    }
    pickNumber(lastFrom, lastTo)
    endShow()
})

resetBtn.addEventListener('click', () => {
  pickedNums = []
})