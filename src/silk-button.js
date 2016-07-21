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
  ripple.appendChild(button)
  ripple.appendChild(overlay)

  button.innerHTML = '<content></content>'

  shadow.appendChild(ripple)
}

export default document.registerElement('silk-button', {
  prototype: SilkButton
})
