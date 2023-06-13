const section = document.querySelector('.calc-price')
const selectList = section.querySelector('.select-list')
const inputList = section.querySelector('.inputs-w')
const button = section.querySelector('[data-modal-button]')

button.addEventListener('click', () => {
  let result = true
  Array.from(inputList.children).forEach((el, index) => {
    el.children[0].classList.remove('error')
  })

  Array.from(selectList.children).forEach((el) => {
    if (el.classList.contains('hidden')) {
      const errorInput = inputList.querySelector(
        `[data-name="${el.dataset.name}"]`
      )
      errorInput.children[0].classList.add('error')
      result = false
    }
  })

  if (result == true) {
    if (button.parentNode.querySelector('.calc-price__summary-column-error')) {
      button.parentNode
        .querySelector('.calc-price__summary-column-error')
        .remove()
    }

    document
      .querySelector(`[data-modal=${button.dataset.modalButton}]`)
      .classList.add('modal-open')
  } else {
    if (button.parentNode.querySelector('.calc-price__summary-column-error')) {
      button.parentNode
        .querySelector('.calc-price__summary-column-error')
        .remove()
    }
    const errorLabel = document.createElement('label')
    errorLabel.classList.add('calc-price__summary-column-error')
    errorLabel.innerHTML = '<span>*</span> Отметьте все поля'
    button.parentNode.prepend(errorLabel)
  }
})
