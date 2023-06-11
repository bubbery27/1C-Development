const allForms = document.querySelectorAll('[name="pageForm"]')

allForms.forEach((form) => {
  Array.from(form).forEach((input) => {
    input.addEventListener('blur', (event) => {
      validation(event.target)
    })

    input.addEventListener('input', (event) => {
      validation(event.target)
    })

    if (input.classList.contains('modal__submit-btn')) {
      input.addEventListener('click', () => {
        validation()
      })
    }
  })
})

function validation(input=this) {
  removeError(input)

  let result = true
  if (input.hasAttribute('data-required')) {
    if (input.value == '' || input.value == '+7') {
      createError(input, 'Поле не заполнено')
      result = false
    }
  }

  if (input.dataset.reg) {
    const reg = new RegExp(input.dataset.reg)
    console.log(input.type, input.value)

    if (input.type == 'text') {
      if (!reg.test(input.value)) {
        createError(input, 'В этом поле допустимы только буквы')
      }
    }
    if (input.type == 'email') {
      if (!reg.test(input.value)) {
        createError(input, 'прим.: example@mail.com')
      }
    }

 
    if(input.type == 'tel') {
      console.log(input.value)
      const number = input.value
      if (!reg.test(number.replace(/\D/g, ''))) {
        createError(input, 'прим.: +7 (999) 123 45 67')
      }
    }
    result = false
  }

  return result
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

// allForms.forEach((form) => {
//   form.addEventListener('input', (event) => {
//     event.preventDefault()
//     if (validation(form)) {
//       console.log('Валидно')
//     }
//   })
// })
// removeError(input)
// function createError(input, text) {
//   const parent = input.parentNode
//   const errorLabel = document.createElement('label')
//   errorLabel.classList.add('error-label')
//   errorLabel.textContent = text
//   parent.classList.add('error')
//   parent.append(errorLabel)
// }

// function validation(form) {
//   function removeError(input) {
//     const parent = input.parentNode
//     if (parent.classList.contains('error')) {
//       parent.querySelector('.error-label').remove()
//       parent.classList.remove('error')
//     }
//   }

//   let result = true

//   form.querySelectorAll('input').forEach((input) => {
//     removeError(input)

//     if (input.dataset.required == 'true') {
//       if (input.value == '') {
//         createError(input, 'Поле не заполнено')
//         result = false
//       }
//     }

//     if (input.dataset.reg) {
//       const reg = new RegExp(input.dataset.reg)
//       console.log(reg.test(input.value))
//       if (!reg.test(input.value)) {
//         if (input.type == 'text') {
//           createError(input, 'В этом поле допустимы только буквы')
//         }
//         if (input.type == 'email') {
//           createError(input, 'Некорректный email (прим.: example@mail.com)')
//         }
//         result = false
//       }
//     }
//   })

//   return result
// }

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
