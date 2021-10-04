const body = document.querySelector('body')
const goInfoEl = document.querySelector('#goinfo')

goInfoEl.addEventListener('click', () => {
    body.classList.remove('stoped')
    gsap.to(window, .7, {
        scrollTo: 400
      })
})




const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function (spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook: 0.5
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});
