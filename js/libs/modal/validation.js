const allForms = document.querySelectorAll('[name="pageForm"]')

let formValidationResult

allForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
  })

  form.querySelector('[type="submit"]').addEventListener('click', () => {
    formValidationResult = true
    Array.from(form).forEach((input) => {
      if (
        (input.dataset.required && input.value == '') ||
        input.value == '+7'
      ) {
        formValidationResult = false
        if (!input.parentNode.classList.contains('error')) {
          createError(input, 'Поле не заполнено')
        }
      }

      if (input.type == 'checkbox') {
        input.nextElementSibling.classList.remove('error')
        if (input.checked == false) {
          input.nextElementSibling.classList.add('error')
          formValidationResult = false
        }
      }
    })

    /*SUBMIT ФОРМЫ (Если прошла валидацию)*/
    if (formValidationResult == true) {
      const messageBox = document.createElement('div')
      messageBox.classList.add('modal-accept')
      messageBox.innerHTML = `
        <div class="modal-accept-box">
          <div class="modal-accept__title">Ваше сообщение отправлено!</div>
          <div class="modal-accept__message">Большое спасибо за проявленный интерес.  Ожидайте наших новостей.</div>
          <div class="modal-accept__btn-w"><button class="button modal-accept__btn">Хорошо</button></div>
        </div>
        `

      form.append(messageBox)

      form.querySelector('.modal-accept').addEventListener('click', () => {
        messageBox.remove()
      })

      form
        .querySelector('.modal-accept-box')
        .addEventListener('click', (event) => {
          event.stopPropagation()
        })

      form.querySelector('.modal-accept__btn').addEventListener('click', () => {
        messageBox.remove()
      })

      Array.from(form).forEach((input) => {
        input.value = ''
      })

      formValidationResult = false
    }
  })

  Array.from(form).forEach((input) => {
    input.addEventListener('blur', (event) => {
      validation(event.target)
    })

    input.addEventListener('input', (event) => {
      validation(event.target)
    })
  })
})

function validation(input) {
  removeError(input)

  if (input.hasAttribute('data-required')) {
    if (input.value == '' || input.value == '+7') {
      createError(input, 'Поле не заполнено')
      formValidationResult = false
    }
  }

  if (input.dataset.reg) {
    const reg = new RegExp(input.dataset.reg)

    if (input.type == 'text') {
      if (!reg.test(input.value)) {
        createError(input, 'В этом поле допустимы только буквы')
        formValidationResult = false
      }
    }

    if (input.type == 'email') {
      if (!reg.test(input.value)) {
        createError(input, 'прим.: example@mail.com')
        formValidationResult = false
      }
    }

    if (input.type == 'tel') {
      if (input.value == '' || input.value == '+7') {
        return
      }

      const number = input.value

      if (!reg.test(number.replace(/\D/g, ''))) {
        console.log(number.replace(/\D/g, ''))

        if (number.replace(/\D/g, '').length >= 11) {
          return
        }
        
        createError(input, 'прим.: +7 (999) 123 45 67')
        formValidationResult = false
      }
    }
  }

  return formValidationResult
}

function createError(input, text) {
  const parent = input.parentNode
  const errorLabel = document.createElement('label')
  errorLabel.classList.add('error-label')
  errorLabel.textContent = text
  parent.classList.add('error')
  parent.append(errorLabel)
}

function removeError(input) {
  const parent = input.parentNode
  if (parent.classList.contains('error')) {
    parent.querySelector('.error-label').remove()
    parent.classList.remove('error')
  }
}

// Маска телефона для input
window.addEventListener('DOMContentLoaded', function () {
  ;[].forEach.call(document.querySelectorAll('[type="tel"]'), function (input) {
    var keyCode
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode)
      var pos = this.selectionStart
      if (pos < 3) event.preventDefault()
      var matrix = '+7 (___) ___ ____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, ''),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        })
      i = new_value.indexOf('_')
      if (i != -1) {
        i < 5 && (i = 3)
        new_value = new_value.slice(0, i)
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return '\\d{1,' + a.length + '}'
        })
        .replace(/[+()]/g, '\\$&')
      reg = new RegExp('^' + reg + '$')
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value
      if (event.type == 'blur' && this.value.length < 5) this.value = ''
    }

    input.addEventListener('input', mask, false)
    input.addEventListener('focus', mask, false)
    input.addEventListener('blur', mask, false)
    input.addEventListener('keydown', mask, false)
  })
})
