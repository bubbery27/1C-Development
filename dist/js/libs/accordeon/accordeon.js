const accordeon = document.querySelector('.accordeon')
const accordeonBtns = accordeon.querySelectorAll('[data-accordeon-btn]')

const initTab = 1; //Какой по счету таб показать при загрузке страницы

accordeonBtns.forEach((button, index) => {

    button.dataset.accordeonBtn = index + 1
    button.nextElementSibling.dataset.accordeonTab = index + 1

    button.addEventListener('click', () => {
        open(button)
    })
})

function open(button) {
    button.classList.toggle('--active')
    button.nextElementSibling.classList.toggle('--active')
}

accordeon.querySelector(`[data-accordeon-btn="${initTab}"]`).classList.add('--active')
accordeon.querySelector(`[data-accordeon-tab="${initTab}"]`).classList.add('--active')

