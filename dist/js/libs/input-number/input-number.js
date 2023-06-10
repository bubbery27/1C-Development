class InputNumber {
  constructor(inputsBlock) {
    this.inputsWrap = document.querySelector(inputsBlock)
    if (this.inputsWrap) {
      this.counts = this.inputsWrap.querySelectorAll('.count')
    } else {
      console.error(`Класс ${inputsBlock} не найден`)
      return
    }

    this.counts.forEach((count) => {
      const decreaseBtn = count.querySelector('.count__decrease')
      const increaseBtn = count.querySelector('.count__increase')
      const countInput = count.querySelector('.count__input')
      const max = parseInt(countInput.getAttribute('max'))
      const min = parseInt(countInput.getAttribute('min'))
      const step = parseInt(countInput.getAttribute('step'))

      if (countInput.getAttribute('value') <= min) {
        increaseBtn.classList.add('count__button_inactive')
      }

      if (countInput.getAttribute('value') >= max) {
        decreaseBtn.classList.add('count__button_inactive')
      }

      count.addEventListener('click', (event) => {
        let countValue = parseInt(countInput.getAttribute('value'))
        if (event.target == increaseBtn) {
          countInput.stepDown()

          if (countInput.value <= min) {
            increaseBtn.classList.add('count__button_inactive')
          }

          if (decreaseBtn.classList.contains('count__button_inactive')) {
            decreaseBtn.classList.remove('count__button_inactive')
          }
        }

        if (event.target == decreaseBtn) {
          countInput.stepUp()
          
          if (countInput.value >= max) {
            decreaseBtn.classList.add('count__button_inactive')
          }

          if (increaseBtn.classList.contains('count__button_inactive')) {
            increaseBtn.classList.remove('count__button_inactive')
          }
        }
      })
    })
  }
}
