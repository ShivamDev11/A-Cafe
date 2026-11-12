(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]')
  const menuPanel = document.querySelector('[data-menu-panel]')

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
    menuToggle.setAttribute('aria-expanded', String(!isOpen))
    menuPanel?.classList.toggle('show', !isOpen)
  })

  menuPanel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuPanel.classList.remove('show')
      menuToggle?.setAttribute('aria-expanded', 'false')
    })
  })

  const menuContent = {
    coffee: [
      ['The signature flat white', 'Double ristretto · silky oat or whole milk', '6'],
      ['Single-origin pour over', 'Rotating harvest · slow brewed to order', '8'],
      ['Brown butter morning bun', 'Laminated in-house · orange sugar', '7'],
    ],
    'from-oven': [
      ['Brown butter morning bun', 'Laminated in-house · orange sugar', '7'],
      ['Olive oil cake', 'Blood orange · cultured cream', '8'],
      ['Pain au chocolat', 'Dark chocolate · flaky, warm, gone early', '7'],
    ],
    'all-day': [
      ['Soft scramble on sourdough', 'Farm eggs · chive · whipped ricotta', '15'],
      ['The market bowl', 'Greens · farro · seasonal vegetables', '16'],
      ['Brown butter morning bun', 'Laminated in-house · orange sugar', '7'],
    ],
  }
  const menuList = document.querySelector('[data-menu-list]')
  document.querySelectorAll('[data-menu-category]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-menu-category]').forEach((item) => {
        item.classList.toggle('active', item === tab)
        item.setAttribute('aria-selected', String(item === tab))
      })
      const category = tab.dataset.menuCategory
      if (!menuList || !category) return
      menuList.dataset.category = category
      menuList.innerHTML = menuContent[category].map(([name, note, price], index) => `
        <article class="menu-item is-visible">
          <span class="menu-number">0${index + 1}</span>
          <div class="menu-item-copy"><span class="menu-tag">${category === 'coffee' && index === 0 ? 'HOUSE FAVORITE' : category === 'from-oven' ? 'BAKED DAILY' : 'MADE TO ORDER'}</span><h3>${name}</h3><p>${note}</p></div>
          <span class="menu-price">$${price}</span>
        </article>`).join('')
    })
  })

  const dialog = document.querySelector('[data-reservation-dialog]')
  document.querySelectorAll('[data-open-reservation]').forEach((button) => {
    button.addEventListener('click', () => dialog?.showModal())
  })
  document.querySelector('[data-close-reservation]')?.addEventListener('click', () => dialog?.close())
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  const reservationForm = document.querySelector('[data-reservation-form]')
  const dateInput = document.querySelector('#guest-date')
  if (dateInput instanceof HTMLInputElement) {
    const today = new Date()
    dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0]
  }
  reservationForm?.addEventListener('submit', (event) => {
    event.preventDefault()
    const status = document.querySelector('[data-form-status]')
    if (status) status.textContent = 'Online booking isn’t connected yet. Email hello@brewandbeyond.cafe to confirm your table.'
    reservationForm.reset()
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
})()
