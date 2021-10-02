const drawBtn = document.getElementById('drawBtn')
const ballEl = document.querySelector('.ball')

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

function pickNumber () {
    tl.pause()
    gsap.to('.ball', {
        scale : 2
    })
    gsap.to('.shadow', {
        scale : 2
    })
    ballEl.innerHTML = "번호"
    
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
    pickNumber()
    endShow()
})