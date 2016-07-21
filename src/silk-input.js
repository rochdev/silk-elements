import { css } from './utils/'

const fs = require('fs')

const SilkInput = Object.create(HTMLElement.prototype)

SilkInput.createdCallback = render
SilkInput.attributeChangedCallback = attributeChanged

function render () {
  const shadow = this.createShadowRoot()
  const label = createLabel.call(this)
  const input = createInput.call(this)
  const underline = createUnderline.call(this)
  const activeUnderline = createActiveUnderline.call(this)

  css(shadow, fs.readFileSync(__dirname + '/silk-input.css', 'utf8'))

  input.addEventListener('focus', onFocus)
  input.addEventListener('blur', onBlur)

  Object.defineProperties(this, {
    value: {
      get: () => input.value,
      set: value => toggleFloatingLabel.call(label, (input.value = value || ''))
    },
    label: {
      get: () => label.innerText,
      set: value => (label.innerText = value || '')
    }
  })

  this.value = this.getAttribute('value')
  this.label = this.getAttribute('label')

  shadow.appendChild(label)
  shadow.appendChild(input)
  shadow.appendChild(underline)
  shadow.appendChild(activeUnderline)

  function onFocus () {
    label.classList.add('active', 'floating')
    activeUnderline.classList.add('active')
  }

  function onBlur () {
    label.classList.remove('active')
    toggleFloatingLabel.call(label, input.value)
    activeUnderline.classList.remove('active')
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

function createLabel () {
  const label = document.createElement('label')

  label.id = 'label'

  return label
}

function createInput () {
  const input = document.createElement('input')

  input.id = 'input'

  return input
}

function createUnderline () {
  const underline = document.createElement('hr')

  underline.id = 'underline'

  return underline
}

function createActiveUnderline () {
  const underline = document.createElement('hr')

  underline.id = 'active-underline'

  return underline
}

function toggleFloatingLabel (value) {
  this.classList[value ? 'add' : 'remove']('floating')
}

export default document.registerElement('silk-input', {
  prototype: SilkInput
})
