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
    itcSlider.dispose(slider)
  } else {
    ItcSlider.getOrCreateInstance('.itc-slider', {
      loop: false,
      refresh: true,
    })
  }
}).observe(document.body)

// Инициализация team-inputs
const inputsNum = new InputNumber('.team-inputs')

// Инициализация duration-input
const section = document.querySelector('.calc-price')
const summary = section.querySelector('.calc-price__summary-column')
const rangeSummary = summary.querySelector('.range-grid')
const rangeInput = section.querySelector('.range-input')
const slider = section.querySelector('#month-slider')


noUiSlider.create(slider, {
  start: [1],
  connect: false,
  step: 1,
  tooltips: [true],
  format: {
    to: function (value) {
      RangeSummary(value)
      const rangeValue = rangeSummary.querySelector('.range-date')
      console.log(value)
      rangeValue.textContent = Math.floor(value) + ' мес.'
      return Math.floor(value) + ' мес.'
    },
    from: function (value) {
      return value.replace(',-', '')
    },
  },
  range: {
    min: 0,
    max: 24,
  },
  pips: {
    mode: 'positions',
    values: [],
    density: 4.2,
    stepped: true,
  },
})

function durationConclusion() {
  rangeSummary.addEventListener('click', (event) => {
    remove(event)
  })

  function remove(event) {
    if (event.target.hasAttribute(`data-service-close`)) {
      slider.noUiSlider.set(0)
      event.target.parentElement.remove()
      formData.service = ''
    }
    if (rangeSummary.querySelectorAll('.select-list__item').length == 0) {
      rangeSummary.classList.add('hidden')
    }
  }

  rangeInput.addEventListener('mouseup', () => {
    // Добавляем свойство duration из слайдера в formData
    formData.duration = slider.noUiSlider.get().replace(/\D/g, '')
  })
}

function RangeSummary(value) {
  if(value == 0) {
    console.log(0)
    rangeSummary.classList.add('hidden')
    rangeSummary.children[0].remove()
  } else {
    rangeSummary.classList.remove('hidden')
  }

  if(!rangeSummary.classList.contains('hidden') || !rangeSummary.children) {
    return
  }

  const listItem = document.createElement('div')
  listItem.classList.add('select-list__item')
  listItem.innerHTML = `
  Длительность<span class="range-date">${Math.floor(value)} мес.</span>
  <img src="./img/calc-price/close.svg" data-service-close alt="X">
  `
  rangeSummary.appendChild(listItem)
}

durationConclusion()


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
