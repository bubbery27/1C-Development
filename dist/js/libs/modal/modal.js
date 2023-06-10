const modals = document.querySelectorAll('.modal')
const focusClass = 'modal-input--focus'
const titleFocusClass = 'title-input--focus'
const modalBtns = document.querySelectorAll('[data-modal-button]')


modalBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const currentModal = document.querySelector(`[data-modal=${button.dataset.modalButton}]`)
    currentModal.classList.add('modal-open')
  })
})

modals.forEach((modal) => {
  const inputBlocks = modal.querySelectorAll('.modal__inputs-item')
  const modalCloseBtn = modal.querySelector('[data-close-modal]')
  const modalTabBtn = modal.querySelector('[data-modal-tab-button]')
  const modalTabs = modal.querySelectorAll('[data-modal-tab]')
  
  if (window.matchMedia('screen and (max-width: 574px)').matches){
    modalTabBtn.addEventListener('click', () => {
      modalTabBtn.classList.toggle(`${modalTabBtn.classList[0] + '--opened'}`)
      modalTabs.forEach((modalTab) => {
        modalTab.classList.toggle(`${modalTab.classList[0] + '--opened'}`)
      })
    })
    modal.querySelector('[name="email"]').setAttribute('placeholder', 'Email')
    modal.querySelector('[name="company"]').setAttribute('placeholder', 'Компания')
  }
  
  modal.addEventListener('click', () => {
    modal.classList.remove('modal-open')
  })

  modal.querySelector('.modal-window').addEventListener('click', (event) => {
    event.stopPropagation()
  })

  modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('modal-open')
  })

  inputBlocks.forEach((inputBlock) => {
    const inputs = inputBlock.querySelectorAll('.modal__inputs-item-input')
    const inputTitle = inputBlock.querySelector('.modal__inputs-item-title')
    

    const messageInput = modal.querySelector('.modal__inputs-item-input_message')
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
        inputTitle.classList.add(titleFocusClass)
      })

      input.addEventListener('blur', () => {
        input.parentElement.classList.remove(focusClass)
        input.previousElementSibling.classList.remove(focusClass)
        input.nextElementSibling.classList.remove(focusClass)
        inputTitle.classList.remove(titleFocusClass)
      })
    })
  })
})
