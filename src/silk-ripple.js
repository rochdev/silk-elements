import Dom from './utils/dom'
import { scale, fade } from './utils/animations'
import assign from 'lodash/assign'
import css from './utils/css'

const fs = require('fs')

var SilkRippleProto = Object.create(HTMLElement.prototype)

SilkRippleProto.createdCallback = render

function start (event, isRippleTouchGenerated) {
  var self = this
  var circle = createCircle()

  assign(circle.style, getRippleStyle.call(this, event))

  this.shadowRoot.children[1].appendChild(circle)

  const end = () => {
    var player = fade(circle, 0.1, 0)

    player.onfinish = () => self.shadowRoot.children[1].removeChild(circle)
    player.play()

    self.removeEventListener('mouseup', end)
    self.removeEventListener('mouseleave', end)
  }

  this.addEventListener('mouseup', end)
  this.addEventListener('mouseleave', end)

  animateCircle(circle)
}

function handleMouseDown (event) {
  // only listen to left clicks
  if (event.button === 0) {
    start.call(this, event, false)
  }
}

function getRippleStyle (event) {
  var style = {}
  var el = this
  var elHeight = el.offsetHeight
  var elWidth = el.offsetWidth
  var offset = Dom.offset(el)
  var isTouchEvent = event.touches && event.touches.length
  var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX
  var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY
  var pointerX = pageX - offset.left
  var pointerY = pageY - offset.top
  var topLeftDiag = calcDiag(pointerX, pointerY)
  var topRightDiag = calcDiag(elWidth - pointerX, pointerY)
  var botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY)
  var botLeftDiag = calcDiag(pointerX, elHeight - pointerY)
  var rippleRadius = Math.max(
    topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
  )
  var rippleSize = rippleRadius * 2
  var left = pointerX - rippleRadius
  var top = pointerY - rippleRadius

  style.height = rippleSize + 'px'
  style.width = rippleSize + 'px'
  style.top = top + 'px'
  style.left = left + 'px'

  return style
}

function calcDiag (a, b) {
  return Math.sqrt((a * a) + (b * b))
}

function createCircle () {
  const circle = document.createElement('div')

  circle.className = 'silk-circle'

  return circle
}

function animateCircle (circle) {
  var player = scale(circle)

  player.play()
}

function render () {
  var root = this.createShadowRoot()
  var content = document.createElement('content')
  var span = document.createElement('span')

  span.className = 'silk-ripple'

  css(root, fs.readFileSync(__dirname + '/silk-ripple.css', 'utf8'))

  this.style.display = 'block'
  this.style.height = '100%'

  root.appendChild(span)
  root.appendChild(content)

  this.addEventListener('mousedown', handleMouseDown)
}

export default document.registerElement('silk-ripple', {
  prototype: SilkRippleProto
})
