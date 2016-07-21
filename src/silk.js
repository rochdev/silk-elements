import SilkButton from './silk-button'
import SilkInput from './silk-input'
import SilkRipple from './silk-ripple'
import css from './utils/css'

const fs = require('fs')

css(document.head, fs.readFileSync(__dirname + '/common/colors.css', 'utf8'))
css(document.head, fs.readFileSync(__dirname + '/common/elevation.css', 'utf8'))

window.SilkButton = SilkButton
window.SilkInput = SilkInput
window.SilkRipple = SilkRipple
