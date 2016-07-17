import './silk-ripple'
import css from './utils/css'

const fs = require('fs')

var SilkButton = Object.create(HTMLElement.prototype)

SilkButton.createdCallback = render

function render () {
  var shadow = this.createShadowRoot()
  var button = document.createElement('button')
  var ripple = document.createElement('silk-ripple')
  var overlay = document.createElement('div')

  overlay.id = 'overlay'

  css(shadow, fs.readFileSync(__dirname + '/silk-button.css', 'utf8'))

  button.disabled = this.getAttribute('disabled') !== null
  button.type = this.getAttribute('type') || 'button'
  button.appendChild(ripple)
  button.appendChild(overlay)

  ripple.innerHTML = '<content></content>'

  if (this.getAttribute('raised') !== null) {
    this.addEventListener('mousedown', lift)
    this.addEventListener('mouseup', drop)
    this.addEventListener('mouseleave', drop)
  }

  shadow.appendChild(button)
}

function lift () {
  this.style.boxShadow = 'var(--silk-elevation-8dp)'
}

function drop () {
  this.style.boxShadow = 'var(--silk-elevation-2dp)'
}

export default document.registerElement('silk-button', {
  prototype: SilkButton
})
