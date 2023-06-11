const modals = document.querySelectorAll('.modal')
const modalBtns = document.querySelectorAll('[data-modal-button]')
const focusClass = 'modal-input--focus'
const titleFocusClass = 'title-input--focus'

modalBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const currentModal = document.querySelector(
      `[data-modal=${button.dataset.modalButton}]`
    )
    currentModal.classList.add('modal-open')
  })
})

modals.forEach((modal) => {
  const inputBlocks = modal.querySelectorAll('.modal__inputs-item')
  const modalTabs = modal.querySelectorAll('[data-modal-tab]')
  const modalTabBtn = modal.querySelector('[data-modal-tab-button]')
  const modalCloseBtn = modal.querySelector('[data-close-modal]')

  if (window.matchMedia('screen and (max-width: 574px)').matches) {
    modalTabBtn.addEventListener('click', () => {
      modalTabBtn.classList.toggle(`${modalTabBtn.classList[0] + '--opened'}`)
      modalTabs.forEach((modalTab) => {
        modalTab.classList.toggle(`${modalTab.classList[0] + '--opened'}`)
      })
    })

    if (modal.querySelector('[name="email"]')) {
      modal.querySelector('[name="email"]').setAttribute('placeholder', 'Email')
      modal
        .querySelector('[name="company"]')
        .setAttribute('placeholder', 'Компания')
    }
    
  }

  modal.addEventListener('click', (event) => {
    modal.classList.remove('modal-open')
  })

  modal.querySelector('.modal-window').addEventListener('click', (event) => {
    event.stopPropagation()
  })

  modalCloseBtn.addEventListener('click', (event) => {
    modal.classList.remove('modal-open')
  })

  inputBlocks.forEach((inputBlock) => {
    const inputs = inputBlock.querySelectorAll('.modal__inputs-item-input')
    const inputTitle = inputBlock.querySelector('.modal__inputs-item-title')

    const messageInput = modal.querySelector(
      '.modal__inputs-item-input_message'
    )
    messageInput.addEventListener('keyup', (event) => {
      messageInput.style.height = '30px'
      let scrollHeight = event.target.scrollHeight
      messageInput.style.height = `${scrollHeight}px`
    })

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add(focusClass)
        input.previousElementSibling.classList.add(focusClass)
        input.nextElementSibling.classList.add(focusClass)
        if (inputTitle) {
          inputTitle.classList.add(titleFocusClass)
        }

      })

      input.addEventListener('blur', () => {
        input.parentElement.classList.remove(focusClass)
        input.previousElementSibling.classList.remove(focusClass)
        input.nextElementSibling.classList.remove(focusClass)
        if (inputTitle) {
          inputTitle.classList.remove(titleFocusClass)
        }
      })
    })
  })
})
