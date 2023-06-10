class CustomTab {
  constructor(
    dataTabs,
    tabListSelector,
    tabButtonSelector,
    tabPanelSelector,
    options
  ) {
    let defaultOptions = {
      isChanget: () => {},
      startTab: 0,
    }

    this.options = Object.assign(defaultOptions, options)
    this.selector = dataTabs
    this.tab = document.querySelector(`[data-tabs="${dataTabs}"]`)

    if (this.tab) {
      this.tabList = this.tab.querySelector(`${tabListSelector}`)
      this.tabBtns = this.tabList.querySelectorAll(`${tabButtonSelector}`)
      this.tabPanels = this.tab.querySelectorAll(`${tabPanelSelector}`)
      this.tabClassActive = this.tabBtns[0].classList[0] + '--active'
      this.panelClassActive = this.tabPanels[0].classList[0] + '--active'
    } else {
      console.error('Селектор data-tabs не найден')
      return
    }

    this.check()
    this.init()
    this.events()
  }

  check() {
    if (
      document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1
    ) {
      console.error(
        'Количество элементов с одинаковым data-tabs больше одного!'
      )
      return
    }

    if (this.tabBtns.length !== this.tabPanels.length) {
      console.error('Количество кнопок и панелей не совпадает!')
      return
    }

    if (
      this.tabBtns.length < this.options.startTab - 1 ||
      this.options.startTab <= 0
    ) {
      console.error(`startTab должен быть от 1 до ${this.tabBtns.length}`)
      if (this.options.startTab <= 0) {
        this.options.startTab = 1
      } else if (this.options.startTab > this.tabBtns.length) {
        this.options.startTab = this.tabBtns.length
      }
    }
  }

  init() {
    this.tabBtns.forEach((button, i) => {
      button.setAttribute('type', 'button')
      button.setAttribute('role', 'tab')
      button.setAttribute('tabindex', '-1')
      button.setAttribute('id', `${this.selector}-${i + 1}`)
      button.classList.remove(this.tabClassActive)
    })

    this.tabPanels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('tabindex', '-1')
      panel.setAttribute('aria-labelledby', this.tabBtns[i].id)
      panel.classList.remove(this.panelClassActive)
    })

    this.tabList.setAttribute('role', 'tablist')
    this.tabBtns[this.options.startTab - 1].classList.add(this.tabClassActive)
    this.tabBtns[this.options.startTab - 1].removeAttribute('tabindex')
    this.tabBtns[this.options.startTab - 1].setAttribute(
      'aria-selected',
      'true'
    )

    this.tabPanels[this.options.startTab - 1].classList.add(
      this.panelClassActive
    )
    this.tabPanels[this.options.startTab - 1].removeAttribute('tabindex')
  }

  events() {
    this.tabBtns.forEach((button, i) => {
      button.addEventListener('click', (event) => {
        let currentTab = this.tabList.querySelector('[aria-selected]')

        if (event.currentTarget !== currentTab) {
          this.swichTabs(event.currentTarget, currentTab)
        }
      })

      button.addEventListener('keydown', (event) => {
        let index = Array.prototype.indexOf.call(
          this.tabBtns,
          event.currentTarget
        )

        let dir = null

        if (event.which == 37) {
          dir = index - 1
        } else if (event.which == 39) {
          dir = index + 1
        } else if (event.which == 40) {
          dir = 'down'
        } else {
          dir = null
        }
        console.log(index, dir)

        if (dir !== null) {
          if (dir === 'down') {
            this.tabPanels[i].focus()
          } else if (this.tabBtns[dir]) {
            this.swichTabs(this.tabBtns[dir], event.currentTarget)
          }
        }
      })
    })
  }

  swichTabs(newTab, oldTab) {
    newTab.focus()

    // МЕНЯЕМ КЛАССЫ, АТРИБУТЫ КНОПОК
    oldTab.removeAttribute('aria-selected')
    oldTab.setAttribute('tabindex', '-1')
    oldTab.classList.remove(this.tabClassActive)

    newTab.removeAttribute('tabindex')
    newTab.setAttribute('aria-selected', 'true')
    newTab.classList.add(this.tabClassActive)

    // МЕНЯЕМ КЛАССЫ, АТРИБУТЫ ПАНЕЛЕЙ
    let newIndex = Array.prototype.indexOf.call(this.tabBtns, newTab)
    let oldIndex = Array.prototype.indexOf.call(this.tabBtns, oldTab)

    this.tabPanels[oldIndex].classList.remove(this.panelClassActive)
    this.tabPanels[newIndex].classList.add(this.panelClassActive)

    this.options.isChanget(this)
  }
}
