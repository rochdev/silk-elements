import { css } from './utils/'

const fs = require('fs')

const SilkInput = Object.create(HTMLElement.prototype)

SilkInput.createdCallback = render
SilkInput.attributeChangedCallback = attributeChanged

function render () {
  const self = this
  const shadow = this.createShadowRoot()
  const label = createElement.call(this, 'label', 'label')
  const hint = createElement.call(this, 'span', 'hint')
  const input = createElement.call(this, 'input', 'input')
  const underline = createElement.call(this, 'hr', 'underline')
  const activeUnderline = createElement.call(this, 'hr', 'active-underline')

  css(shadow, fs.readFileSync(__dirname + '/silk-input.css', 'utf8'))

  input.addEventListener('focus', onFocus)
  input.addEventListener('blur', onBlur)
  input.addEventListener('keydown', refresh)
  input.addEventListener('paste', refresh)
  input.addEventListener('cut', refresh)

  Object.defineProperties(this, {
    value: {
      get: () => input.value,
      set: value => {
        toggleFloatingLabel.call(label, (input.value = value || ''))
        refresh.call(this)
      }
    },
    label: {
      get: () => label.innerText,
      set: value => (label.innerText = value || '')
    },
    hint: {
      get: () => hint.innerText,
      set: value => (hint.innerText = value || '')
    }
  })

  this.value = this.getAttribute('value')
  this.label = this.getAttribute('label')
  this.hint = this.getAttribute('hint')

  refresh.call(this)

  shadow.appendChild(label)
  shadow.appendChild(hint)
  shadow.appendChild(input)
  shadow.appendChild(underline)
  shadow.appendChild(activeUnderline)

  function onFocus () {
    label.classList.add('active', 'floating')
    refresh.call(this)
    activeUnderline.classList.add('active')
  }

  function onBlur () {
    label.classList.remove('active')
    toggleFloatingLabel.call(label, input.value)
    refresh.call(this)
    activeUnderline.classList.remove('active')
  }

  function refresh () {
    setTimeout(() => {
      const showHint = !self.value && (!self.label || isFocus(self, input))
      hint.classList[showHint ? 'add' : 'remove']('visible')
    })
  }
}

function attributeChanged (name) {
  switch (name) {
    case 'value':
      this.value = this.getAttribute(name)
      break
    case 'label':
      this.label = this.getAttribute(name)
      break
  }
}

function createElement (tagName, id) {
  const el = document.createElement(tagName)
  id && (el.id = id)
  return el
}

function toggleFloatingLabel (value) {
  this.classList[value ? 'add' : 'remove']('floating')
}

function isFocus (element, fallback) {
  return document.activeElement === element || window.unwrap && document.activeElement === window.unwrap(fallback)
}

export default document.registerElement('silk-input', {
  prototype: SilkInput
})
