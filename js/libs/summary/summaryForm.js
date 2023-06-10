function summaryColumn() {
  const formData = {
    service: '',
    team: {},
    products: {},
    duration: '',
  }

  const form = document.forms.pageForm
  const section = document.querySelector('.calc-price')
  const summary = section.querySelector('.calc-price__summary-column')

  function serviceConclusion() {
    const servicesSummary = summary.querySelector('.services-grid')
    const serviceInputs = section.querySelectorAll(`.service-inputs__list-item`)

    serviceInputs.forEach((inputItem, i) => {
      const input = inputItem.querySelector(`[name='radioService']`)
      const inputText = input.parentElement.innerText
      input.setAttribute('data-service', i)

      if (input.hasAttribute('checked')) {
        change(inputText)
      }

      inputItem.addEventListener('change', (event) => {
        change(inputText)
      })
    })

    servicesSummary.addEventListener('click', (event) => {
      remove(event)
    })

    function change(inputText) {
      let selectedInput = section.querySelector(`[name="radioService"]:checked`)
      const listItem = document.createElement('div')
      const listItems = servicesSummary.querySelectorAll('.select-list__item')
      formData.service = selectedInput.parentElement.innerText
      servicesSummary.classList.remove('hidden')

      listItem.classList.add('select-list__item')
      listItem.innerHTML = `
      ${inputText}
      <img src="./img/calc-price/close.svg" data-service-close alt="X">
      `
      listItem.setAttribute(
        'data-service-id',
        selectedInput.getAttribute('data-service')
      )

      servicesSummary.appendChild(listItem)

      listItems.forEach((item) => {
        if (
          item.getAttribute('data-service-id') !==
          selectedInput.getAttribute('data-service')
        ) {
          servicesSummary.removeChild(item)
        }
      })
    }

    function remove(event) {
      if (event.target.hasAttribute(`data-service-close`)) {
        const id = parseInt(
          event.target.parentElement.getAttribute('data-service-id')
        )
        form.radioService[id].checked = false
        event.target.parentElement.remove()
        formData.service = ''
      }
      if (servicesSummary.querySelectorAll('.select-list__item').length == 0) {
        servicesSummary.classList.add('hidden')
      }
    }

    if (servicesSummary.children.length == 0) {
      servicesSummary.classList.add('hidden')
    }
  }

  function teamConclusion() {
    const teamSummary = summary.querySelector('.team-grid')
    const counts = section.querySelectorAll('.count')

    if (teamSummary.children.length == 0) {
      teamSummary.classList.add('hidden')
    }

    counts.forEach((count, index) => {
      const input = count.querySelector('.count__input')
      const decreaseBtn = count.querySelector('.count__decrease')
      const increaseBtn = count.querySelector('.count__increase')
      input.dataset.team = 'team-' + index

      formData.team[input.dataset.formTitle] = input.value

      count.addEventListener('click', (event) => {
        if (event.target == increaseBtn) {
          change(input)
        }

        if (event.target == decreaseBtn) {
          change(input)
          teamSummary.classList.remove('hidden')
        }
      })
    })

    teamSummary.addEventListener('click', remove)

    function change(input) {
      const inputText = input.dataset.title
      const listItem = document.createElement('div')
      const currentSelectList = teamSummary.querySelector(
        `[data-team-id="${input.dataset.team}"]`
      )
      formData.team[input.dataset.formTitle] = input.value
      if (input.value == input.min) {
        currentSelectList.remove()
        if (teamSummary.children.length === 0) {
          teamSummary.classList.add('hidden')
        }
      }
      // Проверяем, есть ли такая плашка в правой колонке
      if (currentSelectList) {
        // Изменяем значение в плашке
        currentSelectList.firstElementChild.textContent = input.value
        return
      }

      listItem.classList.add('select-list__item')
      listItem.innerHTML = `
      <span class="team-count-number">${input.value}</span>${inputText}
      <img src="./img/calc-price/close.svg" data-team-close alt="X">
      `
      listItem.dataset.teamId = input.dataset.team

      teamSummary.appendChild(listItem)
      teamSummary.classList.remove('hidden')
    }

    function remove(event) {
      if (event.target.hasAttribute(`data-team-close`)) {
        const id = event.target.parentElement.getAttribute('data-team-id')
        const currentCount = section.querySelector(`[data-team="${id}"]`)
        currentCount.value = 0
        currentCount.previousElementSibling.classList.add(
          'count__button_inactive'
        )
        currentCount.nextElementSibling.classList.remove(
          'count__button_inactive'
        )
        event.target.parentElement.remove()
      }
      if (teamSummary.querySelectorAll('.select-list__item').length == 0) {
        teamSummary.classList.add('hidden')
      }
    }
  }

  function productsConclusion() {
    const productsBlock = section.querySelector('.products-inputs')
    const productsInputs = productsBlock.querySelectorAll(
      '[name="product-checkbox"]'
    )
    const productsSummary = summary.querySelector('.products-grid')

    if (productsSummary.children.length == 0) {
      productsSummary.classList.add('hidden')
    }

    productsInputs.forEach((checkbox, index) => {
      checkbox.dataset.product = `${checkbox.name}-${index}`
      checkbox.addEventListener('change', (event) => {
        change(checkbox)
      })
    })

    function change(checkbox) {
      const inputText = checkbox.parentElement.textContent
      const listItem = document.createElement('div')
      const currentSelectCheckbox = productsSummary.querySelector(
        `[data-product-id="${checkbox.dataset.product}"]`
      )
      // formData.team[input.dataset.formTitle] = input.value
      if (productsSummary.children.length === 0) {
        productsSummary.classList.add('hidden')
      }

      if (checkbox.checked) {
        formData.products[checkbox.value] = true
      } else {
        delete formData.products[checkbox.value]
      }

      // Проверяем, есть ли такая плашка в правой колонке
      if (currentSelectCheckbox) {
        // Изменяем значение в плашке
        currentSelectCheckbox.remove()
        if (productsSummary.children.length == 0) {
          productsSummary.classList.add('hidden')
        }
        return
      }

      listItem.classList.add('select-list__item')
      listItem.innerHTML = `
      ${inputText}
      <img src="./img/calc-price/close.svg" data-team-close alt="X">
      `
      listItem.dataset.productId = checkbox.dataset.product

      productsSummary.appendChild(listItem)
      productsSummary.classList.remove('hidden')

      if (productsSummary.children.length == 0) {
        productsSummary.classList.add('hidden')
      }
    }

    productsSummary.addEventListener('click', remove)

    function remove(event) {
      if (event.target.hasAttribute(`data-team-close`)) {
        const id = event.target.parentElement.getAttribute('data-product-id')
        const currentProduct = section.querySelector(`[data-product="${id}"]`)
        currentProduct.checked = false
        event.target.parentElement.remove()
        formData.products[currentProduct.value] = false
      }
      if (productsSummary.children.length == 0) {
        productsSummary.classList.add('hidden')
      }
    }
  }

  serviceConclusion()
  teamConclusion()
  productsConclusion()

  return formData
}
