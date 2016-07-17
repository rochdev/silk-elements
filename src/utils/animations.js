import assign from 'lodash/assign'

export const scale = (element, from = 0, to = 1, options) => {
  return element.animate([
    {transform: `scale(${from})`, offset: 0},
    {transform: `scale(${to})`, offset: 1}
  ], assign({
    easing: 'ease-out',
    duration: 300,
    fill: 'both'
  }, options))
}

export const fade = (element, from = 0, to = 1, options) => {
  return element.animate([
    {opacity: from, offset: 0},
    {opacity: to, offset: 1}
  ], assign({
    easing: 'ease-out',
    duration: 300,
    fill: 'both'
  }, options))
}
