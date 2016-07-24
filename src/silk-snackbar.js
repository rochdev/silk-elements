import { css } from './utils/'
import { fade, jump } from './utils/animations'

const fs = require('fs')

const SilkSnackbarProto = Object.create(HTMLElement.prototype)

SilkSnackbarProto.createdCallback = render
SilkSnackbarProto.attributeChangedCallback = attributeChanged

function render () {
  const self = this
  const shadow = this.createShadowRoot()
  const container = createElement.call(this, 'div', 'container')
  const message = createElement.call(this, 'div', 'message')
  const posPlayer = jump(this, [0, '100%', 0], [0, 0, 0])
  const fadePlayer = fade(container, 0, 1, { delay: 100 })
  let open
  let action
  let actionText
  let messageText

  css(shadow, fs.readFileSync(__dirname + '/silk-snackbar.css', 'utf8'))

  Object.defineProperties(this, {
    open: {
      get: () => open,
      set: value => {
        open = !!value

        const event = new CustomEvent(open ? 'open' : 'close', {})

        this.dispatchEvent(event)

        posPlayer.playbackRate = open ? 1 : -1
        posPlayer.play()

        open && fadePlayer.play()
      }
    },

    message: {
      get: () => messageText,
      set: value => {
        messageText = value
        message.innerText = value
      }
    },

    action: {
      get: () => actionText,
      set: value => {
        actionText = value

        if (actionText !== null) {
          action || (action = container.appendChild(createAction.call(this)))
          action.querySelector('#button').innerText = actionText
        } else if (action) {
          container.removeChild(action)
          action = null
        }
      }
    }
  })

  container.appendChild(message)
  shadow.appendChild(container)

  this.message = this.getAttribute('message')
  this.action = this.getAttribute('action')
}

function attributeChanged (name, previousValue, nextValue) {
  switch (name) {
    case 'open':
      this.open = nextValue !== null
      break

    case 'message':
      this.message = nextValue
      break

    case 'action':
      this.action = nextValue
      break
  }
}

function createAction () {
  const action = createElement('div', 'action')
  const button = createElement('silk-button', 'button')

  button.addEventListener('click', () => {
    const event = new CustomEvent('accept', {})
    this.dispatchEvent(event)
    this.open = false
  })

  action.appendChild(button)

  return action
}

function createElement (tagName, id) {
  const el = document.createElement(tagName)
  id && (el.id = id)
  return el
}

export default document.registerElement('silk-snackbar', {
  prototype: SilkSnackbarProto
})
