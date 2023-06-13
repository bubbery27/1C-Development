// Инициализация Tabs
const tab1 = new CustomTab(
  'tab',
  '.projects__tab-nav',
  '.projects__tab-list-item-btn',
  '.tab__panel',
  {
    startTab: 1, //From 1 to last_num
  }
)

// Инициализация itcSlider
const itcSlider = ItcSlider.getOrCreateInstance('.itc-slider', {
  loop: false,
  refresh: true,
})

// Выключаем itcSlider на мобилльном разрешщении
new ResizeObserver(() => {
  if (window.matchMedia('screen and (max-width: 991px)').matches) {
    itcSlider.dispose()
  } else {
    ItcSlider.getOrCreateInstance('.itc-slider', {
      loop: false,
      refresh: true,
    })
  }
}).observe(document.body)

// Инициализация team-inputs
const inputsNum = new InputNumber('.team-inputs')


const formData = summaryColumn()

/* Burger Menu */
const burgerBtn = document.querySelector('.burger-menu-btn')
const burgerMenu = document.querySelector('.burger-menu')

burgerBtn.addEventListener('click', (event) => {
  burgerBtn.classList.toggle('burger-menu-btn--opened')
  burgerMenu.classList.toggle('burger-menu--opened')
})

burgerMenu.addEventListener('click', (event) => {
  if (
    event.target['tagName'] === 'A' ||
    event.target.parentElement['tagName'] === 'A' ||
    event.target.children[0]['tagName'] === 'A'
  ) {
    burgerBtn.classList.toggle('burger-menu-btn--opened')
    burgerMenu.classList.toggle('burger-menu--opened')
  }
})

/* GO-TOP */
const goTopBtn = document.querySelector('.go-top')

// обработчик на скролл окна
window.addEventListener('scroll', trackScroll)
// обработчик на нажатии
goTopBtn.addEventListener('click', goTop)

function trackScroll() {
  // вычисляем положение от верхушки страницы
  const scrolled = window.pageYOffset
  // считаем высоту окна браузера
  const coords = document.documentElement.clientHeight
  // если вышли за пределы первого окна
  if (scrolled > coords) {
    // кнопка появляется
    goTopBtn.classList.add('go-top--show')
  } else {
    // иначе исчезает
    goTopBtn.classList.remove('go-top--show')
  }
}

function goTop() {
  // пока не вернулись в начало страницы
  if (window.pageYOffset > 0) {
    // скроллим наверх
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }
}
